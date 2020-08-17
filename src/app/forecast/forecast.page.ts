import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Forecast } from '@app/models';
import { WeatherService, UserPreferencesService } from '@app/core';
import { WeatherPageBase } from '@app/weather-page-base/weather-page-base';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss'],
})
export class ForecastPage extends WeatherPageBase<Forecast> {
  scale: string;

  constructor(
    loadingController: LoadingController,
    private userPreferences: UserPreferencesService,
    weather: WeatherService,
  ) {
    super(loadingController, () => weather.forecast());
  }

  async ionViewDidEnter() {
    this.scale = await this.userPreferences.getScale();
    return super.ionViewDidEnter();
  }
}
