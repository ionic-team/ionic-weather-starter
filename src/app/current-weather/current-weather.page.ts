import { Component } from '@angular/core';

import { environment } from '@env/environment';
import { Weather } from '@app/models';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss'],
})
export class CurrentWeatherPage {
  icons = environment.icons;
  currentWeather: Weather = {
    temperature: 302,
    condition: 200,
  };

  constructor() {}
}
