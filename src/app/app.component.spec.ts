import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';

import { createPlatformMock } from '../../test/mocks';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let originalSplashScreen: any;
  let originalStatusBar: any;

  beforeEach(async(() => {
    originalStatusBar = Plugins.StatusBar;
    originalSplashScreen = Plugins.SplashScreen;
    Plugins.StatusBar = jasmine.createSpyObj('StatusBar', [
      'setBackgroundColor',
      'setStyle',
    ]);
    Plugins.SplashScreen = jasmine.createSpyObj('SplashScreen', ['hide']);
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Platform, useFactory: createPlatformMock }],
    }).compileComponents();
  }));

  afterEach(() => {
    Plugins.StatusBar = originalStatusBar;
    Plugins.SplashScreen = originalSplashScreen;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('initialization', () => {
    let platform: Platform;
    beforeEach(() => {
      platform = TestBed.inject(Platform);
    });

    describe('in a hybrid mobile context', () => {
      beforeEach(() => {
        (platform.is as any).withArgs('hybrid').and.returnValue(true);
      });

      it('styles the status bar', () => {
        TestBed.createComponent(AppComponent);
        expect(Plugins.StatusBar.setStyle).toHaveBeenCalledTimes(1);
        expect(Plugins.StatusBar.setStyle).toHaveBeenCalledWith({
          style: StatusBarStyle.Dark,
        });
      });

      it('hides the splash screen', () => {
        TestBed.createComponent(AppComponent);
        expect(Plugins.SplashScreen.hide).toHaveBeenCalledTimes(1);
      });

      describe('when android', () => {
        beforeEach(() => {
          (platform.is as any).withArgs('android').and.returnValue(true);
          document.documentElement.style.setProperty(
            '--ion-color-primary-shade',
            ' #ff0000',
          );
        });

        it('sets the status bar background color', () => {
          TestBed.createComponent(AppComponent);
          expect(Plugins.StatusBar.setBackgroundColor).toHaveBeenCalledTimes(1);
          expect(Plugins.StatusBar.setBackgroundColor).toHaveBeenCalledWith({
            color: '#ff0000',
          });
        });
      });

      describe('when not android', () => {
        beforeEach(() => {
          (platform.is as any).withArgs('android').and.returnValue(false);
        });

        it('does not set the status bar background color', () => {
          TestBed.createComponent(AppComponent);
          expect(Plugins.StatusBar.setBackgroundColor).not.toHaveBeenCalled();
        });
      });
    });

    describe('in a web context', () => {
      beforeEach(() => {
        (platform.is as any).withArgs('hybrid').and.returnValue(false);
      });

      it('does not style the status bar', () => {
        TestBed.createComponent(AppComponent);
        expect(Plugins.StatusBar.setStyle).not.toHaveBeenCalled();
      });

      it('does not hide the splash screen', () => {
        TestBed.createComponent(AppComponent);
        expect(Plugins.SplashScreen.hide).not.toHaveBeenCalled();
      });
    });
  });
});
