import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { WeatherService, UserPreferencesService } from '@app/core';
import { Weather } from '@app/models';
import { WeatherPageBase } from '@app/weather-page-base/weather-page-base';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss'],
})
export class CurrentWeatherPage extends WeatherPageBase<Weather> {
  scale: string;

  constructor(
    loadingController: LoadingController,
    private userPreferences: UserPreferencesService,
    weather: WeatherService,
  ) {
    super(loadingController, () => weather.current());
  }

  async ionViewDidEnter(): Promise<void> {
    this.scale = await this.userPreferences.getScale();
    return super.ionViewDidEnter();
  }

  async toggleScale(): Promise<void> {
    this.scale = this.scale === 'F' ? 'C' : 'F';
    await this.userPreferences.setScale(this.scale);
  }
}
