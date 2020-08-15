import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { UvIndexPage } from './uv-index.page';
import { WeatherService } from '@app/core';
import { createWeatherServiceMock } from '@app/core/testing';

describe('UvIndexPage', () => {
  let component: UvIndexPage;
  let fixture: ComponentFixture<UvIndexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UvIndexPage],
      imports: [IonicModule],
      providers: [
        { provide: WeatherService, useFactory: createWeatherServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UvIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('entering the page', () => {
    beforeEach(() => {
      const weather = TestBed.inject(WeatherService);
      (weather.uvIndex as any).and.returnValue(
        of({
          value: 3.5,
          riskLevel: 1,
        }),
      );
    });

    it('gets the UV index', () => {
      const weather = TestBed.inject(WeatherService);
      component.ionViewDidEnter();
      expect(weather.uvIndex).toHaveBeenCalledTimes(1);
    });

    it('displays the UV index', () => {
      component.ionViewDidEnter();
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('kws-uv-index'));
      expect(el).toBeTruthy();
    });

    it('displays the appropriate description', () => {
      component.ionViewDidEnter();
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('.description'));
      expect(el.nativeElement.textContent).toContain('Stay in the shade');
    });
  });
});
