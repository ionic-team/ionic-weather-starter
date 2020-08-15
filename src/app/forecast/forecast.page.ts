import { Component } from '@angular/core';

import { environment } from '@env/environment';
import { Forecast } from '@app/models';
import { WeatherService } from '@app/core';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss'],
})
export class ForecastPage {
  icons = environment.icons;
  forecast: Forecast;

  constructor(private weather: WeatherService) {}

  ionViewDidEnter() {
    this.weather.forecast().subscribe(f => (this.forecast = f));
  }
}
