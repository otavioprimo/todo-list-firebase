import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { User } from '../../models/user.interface';
import { Request } from '../../models/request.interface';
import { UserProvider } from '../../providers/user/user';
import { RequestsProvider } from '../../providers/requests/requests';

@IonicPage()
@Component({
  selector: 'page-add-friend',
  templateUrl: 'add-friend.html',
})
export class AddFriendPage {
  users: User[];
  searchUser: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userService: UserProvider, private alertCtrl: AlertController,
    private requestService: RequestsProvider, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

  }

  search(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.userService.getUserByNickname(val.toLowerCase()).subscribe((el: User[]) => {
        this.users = el;
        console.log(el);
      });
    } else {
      this.users = [];
    }
  }

  onCancel() {
    this.users = [];
  }

  addFriend(user: User) {
    let alert = this.alertCtrl.create({
      title: `Add Friend`,
      message: `To add ${user.nickname} as your friend would you like?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            let request: Request = {
              sender: '',
              recipient: user.uid
            }

            this.requestService.sendFriendRequest(request)
              .then(data => {
                let toast = this.toastCtrl.create({
                  message: `Send to ${user.nickname} your request was`,
                  duration: 2500
                });

                toast.present();

                this.navCtrl.pop();
              });
          }
        }
      ]
    });

    alert.present();
  }

}
