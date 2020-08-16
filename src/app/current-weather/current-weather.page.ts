import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { environment } from '@env/environment';
import { WeatherService } from '@app/core';
import { Weather } from '@app/models';
import { WeatherPageBase } from '@app/weather-page-base/weather-page-base';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss'],
})
export class CurrentWeatherPage extends WeatherPageBase<Weather> {
  constructor(loadingController: LoadingController, weather: WeatherService) {
    super(loadingController, () => weather.current());
  }
}
