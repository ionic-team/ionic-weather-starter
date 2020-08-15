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

import { UvIndexPage } from './uv-index.page';
import { WeatherService } from '@app/core';
import { createWeatherServiceMock } from '@app/core/testing';
import {
  createOverlayElementMock,
  createOverlayControllerMock,
} from '@test/mocks';

describe('UvIndexPage', () => {
  let component: UvIndexPage;
  let fixture: ComponentFixture<UvIndexPage>;
  let loading;

  beforeEach(async(() => {
    loading = createOverlayElementMock('Loading');
    TestBed.configureTestingModule({
      declarations: [UvIndexPage],
      imports: [IonicModule],
      providers: [
        {
          provide: LoadingController,
          useFactory: () =>
            createOverlayControllerMock('LoadingController', loading),
        },
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

    it('displays a loading indicator', fakeAsync(() => {
      const loadingController = TestBed.inject(LoadingController);
      component.ionViewDidEnter();
      tick();
      expect(loadingController.create).toHaveBeenCalledTimes(1);
      expect(loading.present).toHaveBeenCalledTimes(1);
    }));

    it('gets the UV index', fakeAsync(() => {
      const weather = TestBed.inject(WeatherService);
      component.ionViewDidEnter();
      tick();
      expect(weather.uvIndex).toHaveBeenCalledTimes(1);
    }));

    it('displays the UV index', fakeAsync(() => {
      component.ionViewDidEnter();
      tick();
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('kws-uv-index'));
      expect(el).toBeTruthy();
    }));

    it('displays the appropriate description', fakeAsync(() => {
      component.ionViewDidEnter();
      tick();
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('.description'));
      expect(el.nativeElement.textContent).toContain('Stay in the shade');
    }));

    it('dismisses the loading indicator', fakeAsync(() => {
      component.ionViewDidEnter();
      tick();
      expect(loading.dismiss).toHaveBeenCalledTimes(1);
    }));
  });
});
