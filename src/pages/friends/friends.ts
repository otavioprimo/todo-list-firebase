import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { User } from '../../models/user.interface';

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  myFriends: User[] = [];
  myRequests: User[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private requestService: RequestsProvider, private zone: NgZone) {

  }

  ionViewDidLoad() {
    this.requestService.getMyRequests()
      .subscribe(data => {
        this.zone.run(() => {
          console.log(data);
          this.myRequests = data;
        })
      });

    this.requestService.getmyfriends()
      .subscribe(data => {
        this.zone.run(() => {
          this.myFriends = data;
        })
      })
  }

  addFriend() {
    this.navCtrl.push('AddFriendPage');
  }

  accept(item) {
    let user = {
      uid: item.uid
    }
    this.requestService.acceptrequest(user)
      .then(data => {

      }).catch(err => {
        console.log(err);
      });
  }

  ignore(item) {
    let user = {
      uid: item.uid
    }
    this.requestService.deleterequest(user)
      .then(data => {

      }).catch(err => {
        console.log(err);
      });
  }
}
