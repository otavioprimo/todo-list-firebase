import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthProvider) {
  }

  ionViewDidLoad() {

  }

  logout() {
    this.authService.logout()
      .then(data => {
        console.log(data);
        this.navCtrl.setRoot('LoginPage');
      }).catch(err => {
        console.log(err);
      });
  }

}
