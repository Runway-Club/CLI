import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { CLIService } from './cli.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private cli: CLIService) {
    this.auth.authState.subscribe((user) => {
      console.log(user);
      if (user == null) {
        this.cli.currentContext.email = "";
      } else {
        if (user.email != null) {
          this.cli.currentContext.email = user.email;
        }
      }
    })
  }
  async loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    await this.auth.signInWithPopup(provider);
  }
}
