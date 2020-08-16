import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

export class WeatherPageBase<T> {
  icons = environment.icons;
  data: T;

  constructor(
    private loadingController: LoadingController,
    private fetch: () => Observable<T>,
  ) {}

  async ionViewDidEnter() {
    const loading = await this.loadingController.create();
    loading.present();
    this.fetch().subscribe(d => {
      this.data = d;
      loading.dismiss();
    });
  }
}
