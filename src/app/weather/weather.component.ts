import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {WeatherService} from "../services.service";
import {CeilPipe} from "../ceil.pipe";
import {CommonModule, TitleCasePipe} from "@angular/common";
import {WeekdayPipe} from "../weekday.pipe";
import {concatMap, switchMap} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule,
    MatIconModule, MatFormFieldModule, MatInputModule, CeilPipe, TitleCasePipe, WeekdayPipe],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})

export class WeatherComponent {
  location = '';
  temperature = '30'
  weatherData: any;
  weatherIcon: any = ''
  @ViewChild('input', {static: false}) input!: ElementRef<HTMLInputElement>;
  text: string = '';

  constructor(public weatherService: WeatherService) {
    this.multipleDaysForecast()
  }

  ngOnInit() {
    this.getUserLocation().then(location => {
      console.log('User city:', location.city);
      console.log('User country:', location.country);
      this.text = location.city;
      this.searchWeather();
    });

  }


  changeText(e: Event) {
    const target = e.target as HTMLInputElement;
    this.text = target.value;
  }

  onEnter() {
    this.searchWeather();
    this.input.nativeElement.value = '';
    this.text = '';
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default action (form submission, etc.)
      this.onEnter();
    }
  }

  searchWeather() {
    this.weatherService.getWeather(this.text).subscribe({
      next: data => {
        this.weatherData = data;
        if (this.weatherData?.list) {
          this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherData?.list[0].weather[0].icon}@4x.png`
        }
        console.log(this.text);
      },
      error: err => console.log(err)
    })
  }

  /*
  Below i know that i can use lat and lon param from  this.weatherData object but I here i am demonstrating how to use concatMap and also destructuring.
  Though multipleDaysForecast will not work because that API is paid only so i am getting error for that
   */
  multipleDaysForecast() {
    // this.weatherService.getWeather(this.text).pipe(
    //   (concatMap({city: {coord: {lat, lon}}}) => {
    //     return this.weatherService.multipleDaysForecast(lat, lon, 'fa7b7aed0a86b05552173f0fccbd60ad',7);
    //  })).subscribe({
    //    next: data => {
    //      console.log(data)
    //    },
    //    error: err => {
    //      console.log(err)
    //    }
    //  })
  }

  //geocode= 17814e6071284e4bbdf58d2f2567c4ae
  getCoordinates() {
    return new Promise((success, error) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            success(position);
          },
          (err) => {
            error(err);
          })
      } else {
        error(new Error("Geolocation is not supported by this browser"));
      }
    });
  }

  async getCityAndCountry(latitude: number, longitude: number) {
    //below is the open case api
    const apiKey = '17814e6071284e4bbdf58d2f2567c4ae';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const location = data.results[0].components;
      return {
        city: location.city || location.town || location.village || 'Unknown city',
        country: location.country || 'Unknown country',
      };
    } else {
      throw new Error("Unable to get location data.");
    }
  }

  async getUserLocation(): Promise<{ city: string, country: string }> {
    try {
      const position: any = await this.getCoordinates();
      const {latitude, longitude} = position.coords
      const location = await this.getCityAndCountry(latitude, longitude);
      return location;
    } catch (error) {

      console.error('Error getting user location:', error);
      return {city: 'Unknown', country: 'Unknown'};
    }

  }


}
