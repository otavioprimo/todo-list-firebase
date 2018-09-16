import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user.interface';

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  users: User[];
  myFriends = [];
  myRequests = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userService: UserProvider) {
  }

  ionViewDidLoad() {
    // this.userService.getUsers().subscribe((el: User[]) => {
    //   this.users = el;
    // });
  }

}
