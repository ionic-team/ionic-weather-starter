import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

import { Coordinate } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  async current(): Promise<Coordinate> {
    const { Geolocation } = Plugins;
    const { coords } = await Geolocation.getCurrentPosition();
    return { latitude: coords.latitude, longitude: coords.longitude };
  }
}
