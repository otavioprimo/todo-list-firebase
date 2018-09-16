import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = "LoginPage";
  showRoot: boolean = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private authService: AuthProvider) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      statusBar.backgroundColorByHexString('#75934e');

      this.authService.isLogged()
        .then(data => {
          this.rootPage = 'TabsPage';
          splashScreen.hide();
          this.showRoot = true;
        })
        .catch(err => {
          this.rootPage = 'LoginPage';
          splashScreen.hide();
          this.showRoot = true;
        })
    });
  }
}

