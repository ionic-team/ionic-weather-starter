import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { CurrentWeatherPage } from './current-weather.page';
import { WeatherService } from '@app/core';
import { createWeatherServiceMock } from '@app/core/testing';

describe('CurrentWeatherPage', () => {
  let component: CurrentWeatherPage;
  let fixture: ComponentFixture<CurrentWeatherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentWeatherPage],
      imports: [IonicModule],
      providers: [
        { provide: WeatherService, useFactory: createWeatherServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentWeatherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('entering the page', () => {
    beforeEach(() => {
      const weather = TestBed.inject(WeatherService);
      (weather.current as any).and.returnValue(
        of({
          temperature: 280.32,
          condition: 300,
          date: new Date(1485789600 * 1000),
        }),
      );
    });

    it('gets the current weather', () => {
      const weather = TestBed.inject(WeatherService);
      component.ionViewDidEnter();
      expect(weather.current).toHaveBeenCalledTimes(1);
    });

    it('displays the current weather', () => {
      component.ionViewDidEnter();
      fixture.detectChanges();
      const t = fixture.debugElement.query(By.css('kws-temperature'));
      expect(t).toBeTruthy();
    });
  });
});
