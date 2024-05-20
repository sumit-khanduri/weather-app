import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient ) { }

  getWeather(cityName: string, appId='fa7b7aed0a86b05552173f0fccbd60ad', units='Metric' ): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appId}&units=${units}`);
  }
}
