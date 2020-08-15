import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { environment } from '@env/environment';
import { WeatherService } from '@app/core';
import { Weather } from '@app/models';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss'],
})
export class CurrentWeatherPage {
  icons = environment.icons;
  currentWeather: Weather;

  constructor(
    private loadingController: LoadingController,
    private weather: WeatherService,
  ) {}

  async ionViewDidEnter() {
    const loading = await this.loadingController.create();
    loading.present();
    this.weather.current().subscribe(w => {
      this.currentWeather = w;
      loading.dismiss();
    });
  }
}
