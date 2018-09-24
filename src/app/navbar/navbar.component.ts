import { Component } from '@angular/core';

import { AngularFireAuth } from "angularfire2/auth";
// import { auth } from "firebase/app";
// import { Observable } from 'rxjs';

// import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent { 
  private items: string[] = [ 'logout' ];
  // onHidden(): void {console.log('Dropdown is hidden');}
  // onShown(): void {console.log('Dropdown is shown');}
  // isOpenChange(): void {console.log('Dropdown state is changed');}
  private email: string;
  private password: string;

  constructor(private afAuth: AngularFireAuth) {}

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  formFresh() {
    this.email = '';
    this.password = '';
  }
}
