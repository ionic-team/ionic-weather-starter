import { TestBed } from '@angular/core/testing';
import { Plugins } from '@capacitor/core';

import { UserPreferencesService } from './user-preferences.service';

describe('UserPreferencesService', () => {
  let value: string | undefined | null;
  let originalStorage: any;
  let service: UserPreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    originalStorage = Plugins.Storage;
    Plugins.Storage = jasmine.createSpyObj('Storage', {
      get: Promise.resolve({ value }),
      set: Promise.resolve(),
    });
    service = TestBed.inject(UserPreferencesService);
  });

  afterEach(() => {
    Plugins.Storage = originalStorage;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setScale', () => {
    ['F', 'C'].forEach(value => {
      it(`sets the value to ${value}`, () => {
        service.setScale(value);
        expect(Plugins.Storage.set).toHaveBeenCalledTimes(1);
        expect(Plugins.Storage.set).toHaveBeenCalledWith({
          key: 'scale',
          value,
        });
      });
    });
  });

  describe('getScale', () => {
    it('gets the scale', async () => {
      await service.getScale();
      expect(Plugins.Storage.get).toHaveBeenCalledTimes(1);
      expect(Plugins.Storage.get).toHaveBeenCalledWith({ key: 'scale' });
    });

    ['F', 'C'].forEach(value => {
      it(`gets the scale: ${value}`, async () => {
        (Plugins.Storage.get as any).and.returnValue(
          Promise.resolve({ value }),
        );
        const res = await service.getScale();
        expect(res).toEqual(value);
      });
    });

    ['', null, undefined].forEach(value => {
      it(`gets the scale: ${value}`, async () => {
        (Plugins.Storage.get as any).and.returnValue(
          Promise.resolve({ value }),
        );
        const res = await service.getScale();
        expect(res).toEqual('F');
      });
    });
  });
});
