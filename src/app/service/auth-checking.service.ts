import { Injectable } from '@angular/core';

import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs';

// interface User {
//   email: string;
//   password: string;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthCheckingService {
  private user: Observable<any>;
  constructor(private afAuth: AngularFireAuth) { }

  
}
