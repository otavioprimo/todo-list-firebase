import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {
  private firedata = firebase.database().ref('/users');
  constructor(private afireAuth: AngularFireAuth) {

  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afireAuth.auth.signInWithEmailAndPassword(email, password)
        .then((data) => resolve(data))
        .catch(err => reject(err));
    });
  }

  signup(email: string, password: string, nickname: string) {
    return new Promise((resolve, reject) => {
      this.afireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((data) => {
          this.firedata.child(this.afireAuth.auth.currentUser.uid).set({
            uid: this.afireAuth.auth.currentUser.uid,
            nickname: nickname,
            email: email
          })
            .then(() => resolve(true))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  resetPassword(email: string) {
    return new Promise((resolve, reject) => {
      this.afireAuth.auth.sendPasswordResetEmail(email)
        .then(() => resolve(true))
        .catch(err => reject(err));
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.afireAuth.auth.signOut()
        .then(() => resolve(true))
        .catch((err) => reject(err));
    });
  }

  isLogged() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
  }
}
