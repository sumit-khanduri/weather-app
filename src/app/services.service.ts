import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  rootURL = 'https://api.openweathermap.org/data/2.5/';
  constructor(private http: HttpClient ) { }

  getWeather(cityName: string, appId='fa7b7aed0a86b05552173f0fccbd60ad', units='Metric' ): Observable<any> {
    return this.http.get(`${this.rootURL}forecast?q=${cityName}&appid=${appId}&units=${units}&cnt=7`);
  }

  multipleDaysForecast(lat:number, lon:number, appId='fa7b7aed0a86b05552173f0fccbd60ad', cnt=7){
    console.log('here')
    return this.http.get(`${this.rootURL}forecast/daily?lat=${lat}&${lon}&cnt=${cnt}&appid=${appId}`);
  }


}
