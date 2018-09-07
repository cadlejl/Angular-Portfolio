import { Injectable, OnInit } from '@angular/core';

import { App } from '../../../model/app';

import { AppDataFetchingService } from "../../../service/app-data-fetching.service";

import { AppUpdatingService } from "./app-updating.service";

import { Observable } from "rxjs";

import { FormServicesModule } from '../form-services.module';
import { AppService } from '../../../service/app.service';

@Injectable({ providedIn: FormServicesModule })
export class PositionShiftingService implements OnInit{
  /* Observable derived from http://reactivex.io/rxjs/manual/overview.html#observable */
  // observable = Observable.create(/*function (*/observer/*)*/=> {
  //   // observer.next(1);
  //   // observer.next(2);
  //   // observer.next(3);
  //   //setTimeout(() => {
  //     // observer.next(4);
  //     observer.complete();
  //   //}, 1000);
  // });

  constructor(
    private appDataFetchingService: AppDataFetchingService,
    private appUpdatingService: AppUpdatingService,
    private appService: AppService
  ) { }

  ngOnInit() {
    //this.getApps();
  }

  // getApps() {
  //   this.appDataFetchingService.subject.subscribe({
  //     next: x => this.apps = x
  //   }); 
  // }


  
  public observable = Observable.create(observer => { observer.complete(); }); 

  positionShift(
    apps: App[], 
    /*DEBUG CONTEXT: DANGER: position passed in is not a previous position. It's the currentApp position which should be the new position.
  UPDATE: i think I just fixed it. Well, I think it's passing in the old position now, but that didn't fix the app. */
  createNewPosition?: number,
  movingFromPosition?: number, 
  movingToPositon?: number, 
  deleting?: boolean
) {
    const cn = createNewPosition;  // Interesting we don't have this when adding a new app to a position that does not yet exist.
    const mf = movingFromPosition;
    const mt = movingToPositon;
    const d = deleting;

    /* Multicase scenario: positions will need to be shifted either up or down. */
    apps.forEach(app => this.adjustIfRequired(cn, mf, mt, d, app)); // changing apps to this.apps
    // Subscribed to by RFormModal.freshCaller().
    return this.observable;
  }

  // On a loop
  adjustIfRequired(cn: number, mf: number, mt: number, d: boolean, app: App) {
    let p: number = app.position;
    let operator: string;

    // From FSS newApp()
    if (cn && (!mf && !mt && !d)) {
      if (p >= cn) operator = "+";
    }
    // From PCS positionShift() 
    else if (mt && (!cn && !mf && !d)) {
      if (p >= mt) operator = "+";
    }
    // From ARS delete() & orderPositionShifted()
    else if ((mf && d) && (!cn && !mt)) {
      if (p >= mf) operator = "-";
    }
    else throw console.error('Unhandled scenario in PositionShiftingService');

    if (operator) this.adjustPosition(operator, app, p);
  }

  adjustPosition(operator: string, app: App, p: number) {
    switch (operator) {
      case '+': p += 1; break;
      case '-': p -= 1; break;
    }
    app.position = p;
    this.appUpdatingService.updateApp(app);
  }
}
