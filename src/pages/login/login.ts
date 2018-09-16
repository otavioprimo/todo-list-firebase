import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthProvider, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
      this.email = 'yoda@yoda.com',
      this.password = '5886630';
  }

  login() {
    if (this.email && this.password) {
      let loading = this.loadingCtrl.create({
        content: 'Be done loading must'
      });

      loading.present();

      this.authService.login(this.email, this.password)
        .then(data => {
          if (data) {
            loading.dismiss();
            this.navCtrl.setRoot("TabsPage");
          }
        })
        .catch(err => {
          loading.dismiss();
          console.log(err);

          if (err.code == 'auth/wrong-password') {
            let toast = this.toastCtrl.create({
              message: 'Wrong email or password',
              duration: 2500
            });
            toast.present();
          }
        });
    }
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
