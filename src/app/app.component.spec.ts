import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { createPlatformMock } from '../../test/mocks';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: StatusBar,
          useFactory: () =>
            jasmine.createSpyObj<StatusBar>('StatusBar', ['styleDefault']),
        },
        {
          provide: SplashScreen,
          useFactory: () =>
            jasmine.createSpyObj<SplashScreen>('SplashScreen', ['hide']),
        },
        { provide: Platform, useFactory: createPlatformMock },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('initialization', () => {
    it('waits for the platform to be ready', () => {
      const platform = TestBed.inject(Platform);
      TestBed.createComponent(AppComponent);
      expect(platform.ready).toHaveBeenCalledTimes(1);
    });

    it('sets the default status bar style when ready', async () => {
      const platform = TestBed.inject(Platform);
      const statusBar = TestBed.inject(StatusBar);
      TestBed.createComponent(AppComponent);
      expect(statusBar.styleDefault).not.toHaveBeenCalled();
      await platform.ready();
      expect(statusBar.styleDefault).toHaveBeenCalledTimes(1);
    });

    it('hides the splash screen when ready', async () => {
      const platform = TestBed.inject(Platform);
      const splashScreen = TestBed.inject(SplashScreen);
      TestBed.createComponent(AppComponent);
      expect(splashScreen.hide).not.toHaveBeenCalled();
      await platform.ready();
      expect(splashScreen.hide).toHaveBeenCalledTimes(1);
    });
  });
});
