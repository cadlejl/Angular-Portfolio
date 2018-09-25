import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "angularfire2/auth";

import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth) {}

  canActivate(): Observable<boolean>  {
    return this.afAuth.authState.pipe(
      /*take(1),*/
      map((authState) => !!authState)
    )
  }


}
