import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {WeatherService} from "../services.service";
import {CeilPipe} from "../ceil.pipe";

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, CeilPipe],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})

export class WeatherComponent {
  text:string = 'montreal';
  location = 'New Delhi';
  temperature= '30'
  weatherData:any;
  getWeatherIcon: any = 'https://openweathermap.org/img/wn/10d@2x.png';

  constructor(public weatherService: WeatherService) {
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
         console.log(JSON.stringify(this.weatherData.name))
       },
       error: err => console.log(err)
     })
  }
}
