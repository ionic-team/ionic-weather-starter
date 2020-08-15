import { EMPTY } from 'rxjs';
import { WeatherService } from './weather.service';

export function createWeatherServiceMock() {
  return jasmine.createSpyObj<WeatherService>('WeatherService', {
    current: EMPTY,
    forecast: EMPTY,
    uvIndex: EMPTY,
  });
}
