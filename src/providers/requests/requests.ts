import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Request } from '../../models/request.interface';

@Injectable()
export class RequestsProvider {
  firereq = firebase.database().ref('/requests');
  firefriends = firebase.database().ref('/friends');

  constructor() {

  }

  sendFriendRequest(req: Request) {
    return new Promise((resolve, reject) => {
      this.firereq.child(req.recipient).push({
        sender: req.sender
      }).then(() => {
        resolve(true);
      })
    })
  }



}
