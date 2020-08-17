import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicModule, LoadingController } from '@ionic/angular';
import { of } from 'rxjs';

import { ForecastPage } from './forecast.page';
import { WeatherService, UserPreferencesService } from '@app/core';
import {
  createWeatherServiceMock,
  createUserPreferencesServiceMock,
} from '@app/core/testing';
import {
  createOverlayElementMock,
  createOverlayControllerMock,
} from '@test/mocks';

describe('ForecastPage', () => {
  let component: ForecastPage;
  let fixture: ComponentFixture<ForecastPage>;
  let loading: any;

  beforeEach(async(() => {
    loading = createOverlayElementMock('Loading');
    TestBed.configureTestingModule({
      declarations: [ForecastPage],
      imports: [IonicModule],
      providers: [
        {
          provide: LoadingController,
          useFactory: () =>
            createOverlayControllerMock('LoadingController', loading),
        },
        {
          provide: UserPreferencesService,
          useFactory: createUserPreferencesServiceMock,
        },
        { provide: WeatherService, useFactory: createWeatherServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('entering the page', () => {
    beforeEach(() => {
      const weather = TestBed.inject(WeatherService);
      (weather.forecast as any).and.returnValue(
        of([
          [
            {
              temperature: 300,
              condition: 200,
              date: new Date(2018, 8, 19),
            },
          ],
          [
            {
              temperature: 265,
              condition: 601,
              date: new Date(2018, 8, 20),
            },
          ],
          [
            {
              temperature: 293,
              condition: 800,
              date: new Date(2018, 8, 21),
            },
          ],
        ]),
      );
    });

    ['C', 'F'].forEach(scale => {
      it(`gets the scale: ${scale}`, fakeAsync(() => {
        const userPreferences = TestBed.inject(UserPreferencesService);
        (userPreferences.getScale as any).and.returnValue(
          Promise.resolve(scale),
        );
        component.ionViewDidEnter();
        tick();
        expect(userPreferences.getScale).toHaveBeenCalledTimes(1);
        expect(component.scale).toEqual(scale);
      }));
    });

    it('displays a loading indicator', fakeAsync(() => {
      const loadingController = TestBed.inject(LoadingController);
      component.ionViewDidEnter();
      tick();
      expect(loadingController.create).toHaveBeenCalledTimes(1);
      expect(loading.present).toHaveBeenCalledTimes(1);
    }));

    it('gets the forecast', fakeAsync(() => {
      const weather = TestBed.inject(WeatherService);
      component.ionViewDidEnter();
      tick();
      expect(weather.forecast).toHaveBeenCalledTimes(1);
    }));

    it('shows the forecast items', fakeAsync(() => {
      component.ionViewDidEnter();
      tick();
      fixture.detectChanges();
      const f = fixture.debugElement.queryAll(By.css('kws-daily-forecast'));
      expect(f.length).toEqual(3);
    }));

    it('dismisses the loading indicator', fakeAsync(() => {
      component.ionViewDidEnter();
      tick();
      expect(loading.dismiss).toHaveBeenCalledTimes(1);
    }));
  });
});
