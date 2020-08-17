import { LoadingController } from '@ionic/angular';
import { from, Observable, Subject } from 'rxjs';

import { environment } from '@env/environment';
import { flatMap, tap } from 'rxjs/operators';

export class WeatherPageBase<T> {
  icons = environment.icons;
  private refresh: Subject<void>;
  data$: Observable<T>;

  constructor(
    private loadingController: LoadingController,
    private fetch: () => Observable<T>,
  ) {
    this.refresh = new Subject();
    this.data$ = this.refresh.pipe(flatMap(() => this.getData()));
  }

  async ionViewDidEnter() {
    this.refresh.next();
  }

  private getData(): Observable<T> {
    let loading: any;
    return from(this.showLoading())
      .pipe(
        flatMap(l => {
          loading = l;
          return this.fetch();
        }),
      )
      .pipe(tap(() => loading.dismiss()));
  }

  private async showLoading() {
    const l = await this.loadingController.create({
      message: 'Getting Weather',
    });
    await l.present();
    return l;
  }
}
