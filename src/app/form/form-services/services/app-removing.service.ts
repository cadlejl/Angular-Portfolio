import { Injectable } from '@angular/core';

import { AppService } from "../../../service/app.service";

import { App } from "../../../model/app";

import { PositionShiftingService } from "./position-shifting.service";
import { FormServicesModule } from '../form-services.module';

@Injectable({ providedIn: FormServicesModule })
export class AppRemovingService {
  private apps: App[];
  private currentApp: App;
  private app: App;
  private appPosition: number;
  private currentAppPosition: number;
  private deleteClick: boolean;
  constructor(
    private appService: AppService,
    private positionShiftingService: PositionShiftingService
  ) { }

  // Called by:
  //  FormSubmissionService.confirmAndDelete() in a loop
  initiateAppRemoval(
    apps: App[], currentApp: App, app?: App, appPosition?:number, 
    currentAppPosition?: number/*no position change*/, deleteClick?: boolean, newAppId?: string
  ) {
    this.apps = apps;
    this.currentApp = currentApp;
    this.app = app;
    this.appPosition = appPosition;
    this.currentAppPosition = currentAppPosition;
    this.deleteClick = deleteClick;


    this.deleteClick ? this.delete() : this.movingOut(newAppId);
  }

  ///*** For Deleting Only: 1 method ***///
  // Called by FormSubmissionService.submitForm() if deleteClick is true.
  delete() {
    this.appService.deleteApp(this.currentApp);

    // Experiment
    this.isShiftRequired(this.currentApp);


    // IMPORTANT!: Noticing that the above call has a positionShift() call in the  path, I comment this out under the assumption it's a conflict. Initial test seems ok.
    // this.positionShiftingService.positionShift(this.apps, null, this.currentAppPosition, null, true)
  }


  ///*** For Moving App to Another Position: 4 methods ***///
  private appsInThisPosition: number;

  /* Called by PositionChangingService to remove an app from it's current section after it was copied and placed in another section. 
  I should determine if the position parameter is really necessary. */
  movingOut(newAppId: string) {
    this.currentApp.id = newAppId;
    /* Moving app is held in PositionChangingService (UPDATE: called by initiateAppRemoval() above). Delete original app from its old position. 
    Actually, just to be exact, now the moving app was moved before this method is called. */
    this.appService.deleteApp(this.app);
    // If no other app holds the position, a shift is required.
    this.isShiftRequired(this.app);

    // // If no other app is in the position, shift positions down so there's no gap.
    // if (this.appsInThisPosition < 2) this.orderPositionsShifted(/*old position*/this.appPosition, this.currentApp);
  }

  ///*** Following the path of moving an app from a single position to a multi position, it occurs to me at this point that I'm not sure how the database changes may initialize processes that may conflict with the path I'm on. ***///

  // Initiated in PCS addToExistingSection loop.
  // Determine whether or not app was just deleted from a position with other apps in it.
  isShiftRequired(app: App/*2 different variables access*/) {
    let movingFromPosition: number;
    let appToRemove: App;
    this.appsInThisPosition = 0;
    // It's ok here that apps still has deleted app in it because 
    this.apps.forEach(a => {
      // Does another app hold the positon ? shift not required : shift required;
      if (a.position === app.position) {
        this.appsInThisPosition += 1;
        // If shift is required, app must be moved from array so shift can occur.
        if (a.id === app.id) {
          movingFromPosition = a.position;
          appToRemove = a;
        }
      }
    });
    if (appToRemove) this.removeAppFromArray(appToRemove) 
    else  console.error("Unhandled condition in AppRemovingService isShiftRequired()");

    // If no other app is in the position, shift positions down so there's no gap.
    if (this.appsInThisPosition < 2) this.orderPositionsShifted(
      /*old position*/movingFromPosition, this.currentApp
    );
  }

  /* Removing app with a changed position from the apps array because more work needs to be done with it. */
  removeAppFromArray(a: App) {
    this.apps.splice(this.apps.indexOf(a), 1);
  }

  orderPositionsShifted(movingFromPosition: number, currentApp?: App) {
    if (!this.deleteClick) this.apps.push(this.currentApp);
    // movingOut() pass old position
    this.positionShiftingService.positionShift(this.apps, null, movingFromPosition, null, true);
  }
}
