import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  email: string;
  password: string;
  nickname: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthProvider, private toastCtrl: ToastController) {
  }

  signup() {
    if (this.email == '' || this.password == '' || this.nickname == '') {
      let toast = this.toastCtrl.create({
        message: 'Fill all inputs you must',
        duration: 2500
      });
      toast.present();
    } else {
      this.authService.signup(this.email, this.password, this.nickname)
        .then(() => this.navCtrl.setRoot('TabsPage'))
        .catch(err => {
          if (err.code == 'auth/email-already-in-use') {
            let toast = this.toastCtrl.create({
              message: err.message,
              duration: 2500
            });
            toast.present();
          }
        });
    }
  }

  back() {
    this.navCtrl.setRoot("LoginPage");
  }
}
