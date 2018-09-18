import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Request } from '../../models/request.interface';
import { Observable } from 'rxjs';
import { UserProvider } from '../user/user';

@Injectable()
export class RequestsProvider {
  firereq = firebase.database().ref('/requests');
  firefriends = firebase.database().ref('/friends');

  constructor(private userService: UserProvider) {

  }

  sendFriendRequest(req: Request) {
    req.sender = firebase.auth().currentUser.uid;
    return new Promise((resolve, reject) => {
      this.firereq.child(req.recipient).push({
        sender: req.sender
      }).then(() => {
        resolve(true);
      });
    });
  }

  getMyRequests(): Observable<any> {
    return new Observable((observer) => {
      this.firereq.child(firebase.auth().currentUser.uid).on('value', snapshot => {
        let userdetails = [];
        let myrequests = [];
        let allmyrequests = snapshot.val();

        for (let i in allmyrequests) {
          myrequests.push(allmyrequests[i].sender);
        }

        this.userService.getUsers().then(data => {
          let allusers = data;

          for (var j in myrequests) {
            for (var key in allusers) {
              if (myrequests[j] === allusers[key].uid) {
                userdetails.push(allusers[key]);
              }
            }
          }

          observer.next(userdetails);
        })
      })
    });
  }

  acceptrequest(user) {
    return new Promise((resolve, reject) => {

      this.firefriends.child(firebase.auth().currentUser.uid).push({
        uid: user.uid
      }).then(() => {
        this.firefriends.child(user.uid).push({
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          this.deleterequest(user).then(() => {
            resolve(true);
          })

        })
      })
    })
  }

  deleterequest(user) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(user.uid).once('value', (snapshot) => {
        let somekey;
        for (var key in snapshot.val())
          somekey = key;
        this.firereq.child(firebase.auth().currentUser.uid).child(somekey).remove().then(() => {
          resolve(true);
        })
      })
        .then(() => {

        }).catch((err) => {
          reject(err);
        })
    })
    return promise;
  }

  getmyfriends(): Observable<any> {
    return new Observable((observer) => {

      this.firefriends.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
        let allfriends = snapshot.val();
        let myfriends = [];
        let friendsuid = [];

        for (var i in allfriends)
          friendsuid.push(allfriends[i].uid);

        this.userService.getUsers().then((users) => {

          for (var j in friendsuid)
            for (var key in users) {
              if (friendsuid[j] === users[key].uid) {
                myfriends.push(users[key]);
              }
            }

          observer.next(myfriends);
        }).catch((err) => {
          alert(err);
        })

      })
    })
  }

}
