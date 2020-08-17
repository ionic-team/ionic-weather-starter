import { LocationService } from './location.service';

export function createLocationServiceMock() {
  return jasmine.createSpyObj<LocationService>('LocationService', {
    current: Promise.resolve({ latitude: 0, longitude: 0 }),
  });
}
