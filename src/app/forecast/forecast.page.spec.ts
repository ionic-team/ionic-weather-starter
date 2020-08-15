import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { ForecastPage } from './forecast.page';
import { WeatherService } from '@app/core';
import { createWeatherServiceMock } from '@app/core/testing';

describe('ForecastPage', () => {
  let component: ForecastPage;
  let fixture: ComponentFixture<ForecastPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForecastPage],
      imports: [IonicModule],
      providers: [
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

    it('gets the forecast', () => {
      const weather = TestBed.inject(WeatherService);
      component.ionViewDidEnter();
      expect(weather.forecast).toHaveBeenCalledTimes(1);
    });

    it('shows the forecast items', () => {
      component.ionViewDidEnter();
      fixture.detectChanges();
      const f = fixture.debugElement.queryAll(By.css('kws-daily-forecast'));
      expect(f.length).toEqual(3);
    });
  });
});
