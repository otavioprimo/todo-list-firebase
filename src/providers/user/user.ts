import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.interface';

@Injectable()
export class UserProvider {
  private firedata = firebase.database().ref('/users');
  constructor() {

  }

  // getUsers(): Observable<User[]> {
  //   return new Observable((observer) => {
  //     this.firedata.orderByChild('nickname').on('value', snapshot => {
  //       let userdata = snapshot.val();

  //       let temparr: User[] = [];
  //       for (let key in userdata) {
  //         temparr.push(userdata[key]);
  //       }
  //       observer.next(temparr);
  //     })
  //   })
  // }

  getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.firedata.orderByChild('nickname').on('value', snapshot => {
        let userdata = snapshot.val();

        let temparr: User[] = [];
        for (let key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      });
    })
  }

  getUserByNickname(nickname: string): Observable<User[]> {
    return new Observable((observer) => {
      this.firedata.orderByChild('nickname').startAt(nickname).endAt(`${nickname}\uf8ff`).once('value')
        .then(snapshot => {
          let userdata = snapshot.val();

          let temparr: User[] = [];
          for (let key in userdata) {
            if (userdata[key].uid != firebase.auth().currentUser.uid)
              temparr.push(userdata[key]);
          }
          observer.next(temparr);
        });
    });
  }

}
