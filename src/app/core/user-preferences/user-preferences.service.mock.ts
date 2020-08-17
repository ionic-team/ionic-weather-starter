import { UserPreferencesService } from './user-preferences.service';

export function createUserPreferencesServiceMock() {
  return jasmine.createSpyObj<UserPreferencesService>(
    'UserPreferencesService',
    {
      setScale: Promise.resolve(),
      getScale: Promise.resolve('F'),
    },
  );
}
