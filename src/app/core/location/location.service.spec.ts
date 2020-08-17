import { TestBed } from '@angular/core/testing';
import { Plugins } from '@capacitor/core';

import { LocationService } from './location.service';

describe('LocationService', () => {
  let originalGeolocation: any;
  let service: LocationService;

  beforeEach(() => {
    originalGeolocation = Plugins.Geolocation;
    Plugins.Geolocation = jasmine.createSpyObj('Geolocation', {
      getCurrentPosition: Promise.resolve({
        coords: { latitude: 42, longitude: 73 },
        timestamp: 19943002359,
      }),
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationService);
  });

  afterEach(() => {
    Plugins.Geolocation = originalGeolocation;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('current', () => {
    it('gets the current location using the Geolocation API', () => {
      service.current();
      expect(Plugins.Geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    });

    it('resolves the coordinates', async () => {
      const c = await service.current();
      expect(c).toEqual({ latitude: 42, longitude: 73 });
    });
  });
});
