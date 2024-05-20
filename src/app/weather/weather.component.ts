import {Component} from '@angular/core';
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

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule,
    MatIconModule, MatFormFieldModule, MatInputModule, CeilPipe, TitleCasePipe, WeekdayPipe],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})

export class WeatherComponent {
  text:string = 'montreal';
  location = 'New Delhi';
  temperature= '30'
  weatherData:any;
  weatherIcon:any = ''


  constructor(public weatherService: WeatherService) {
    this.multipleDaysForecast()
  }

  ngOnInit() {
    this.searchWeather();
  }


  changeText(e:Event) {
   const target = e.target as HTMLInputElement;
   this.text = target.value;
  }

  searchWeather() {
     this.weatherService.getWeather(this.text).subscribe({
       next: data => {
         this.weatherData = data;
         if (this.weatherData?.list) {
           this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherData?.list[0].weather[0].icon}@4x.png`
         }
         // console.log(JSON.stringify(this.weatherData))
       },
       error: err => console.log(err)
     })
  }
/*
Below i know that i can use lat and lon param from  this.weatherData object but I here i am demonstrating how to use concatMap and also destructuring.
Though multipleDaysForecast will not work because that API is paid only so i am getting error for that
 */
  multipleDaysForecast() {
   this.weatherService.getWeather(this.text).pipe(
     concatMap(({city: {coord: {lat, lon}}}) => {
       return this.weatherService.multipleDaysForecast(lat, lon, 'fa7b7aed0a86b05552173f0fccbd60ad',7);
    })).subscribe({
      next: data => {
        console.log(data)
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
