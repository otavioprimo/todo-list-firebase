import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.interface';

@Injectable()
export class UserProvider {
  private firedata = firebase.database().ref('/users');
  constructor(private db: AngularFireDatabase) {

  }

  getUsers(): Observable<User[]> {
    return new Observable((observer) => {
      this.firedata.orderByChild('nickname').on('value', snapshot => {
        let userdata = snapshot.val();

        let temparr: User[] = [];
        for (let key in userdata) {
          temparr.push(userdata[key]);
        }
        observer.next(temparr);
      })
    })
  }

}
