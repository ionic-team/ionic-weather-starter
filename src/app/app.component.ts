import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  private initializeApp() {
    if (this.platform.is('hybrid')) {
      const { SplashScreen, StatusBar } = Plugins;
      StatusBar.setStyle({ style: StatusBarStyle.Dark });
      SplashScreen.hide();
      if (this.platform.is('android')) {
        this.setStatusBarColor();
      }
    }
  }

  private setStatusBarColor() {
    const { StatusBar } = Plugins;
    const style = getComputedStyle(document.body);
    const color = style.getPropertyValue('--ion-color-primary-shade').trim();
    StatusBar.setBackgroundColor({ color });
  }
}
