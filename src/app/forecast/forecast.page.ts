import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

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

  constructor(
    private loadingController: LoadingController,
    private weather: WeatherService,
  ) {}

  async ionViewDidEnter() {
    const loading = await this.loadingController.create();
    loading.present();
    this.weather.forecast().subscribe(f => {
      this.forecast = f;
      loading.dismiss();
    });
  }
}
