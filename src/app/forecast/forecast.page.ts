import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Forecast } from '@app/models';
import { WeatherService } from '@app/core';
import { WeatherPageBase } from '@app/weather-page-base/weather-page-base';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss'],
})
export class ForecastPage extends WeatherPageBase<Forecast> {
  constructor(loadingController: LoadingController, weather: WeatherService) {
    super(loadingController, () => weather.forecast());
  }
}
