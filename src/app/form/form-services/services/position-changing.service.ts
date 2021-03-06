import { Injectable } from '@angular/core';

import { App } from "../../../model/app";

// import { AppDataFetchingService } from "../../../service/app-data-fetching.service";

import { AppRemovingService } from "./app-removing.service";
import { AppAddingService } from "./app-adding.service";
import { PositionShiftingService } from './position-shifting.service';
import { FormServicesModule } from '../form-services.module';

// EXPERIMENT 1
import { AppService } from '../../../service/app.service';

@Injectable({ providedIn: FormServicesModule })
export class PositionChangingService {
  private apps: App[];

  // Initialized from the form with new properties.
  private currentApp: App;

  private editingOrNewApp: App;
  private position: number;
  //private editedApp: App;

  constructor(
    // private appDataFetchingService: AppDataFetchingService,
    private appRemovingService: AppRemovingService,
    private appAddingService: AppAddingService,
    private positionShiftingService: PositionShiftingService,

    // EXPERIMENT 1
    private appService: AppService
  ) { }

  // getApps() {
  //   this.appDataFetchingService.subject.subscribe({
  //     next: x => this.apps = x
  //   }); 
  // }

  changePositions(apps: App[], currentApp: App, newSection: Boolean) {
    this.apps = apps;
    this.currentApp = currentApp;
    // These two will point to the same place in memory.
    this.editingOrNewApp = currentApp;
    this.position = currentApp.position;

    // newSection Accoutning Path 1: Beyond this condition I need to account for multiple scenarios.
    if (newSection) this.moveToNewSection();// moving to a new section

    else this.addToExistingSection();
  }

  moveToNewSection() {
    // newSection Accoutning Path 2:
    this.removeApp();
    this.shiftThenAdd();
  }

  addToExistingSection() {
    // Preserve the id for deletion.
    let currentAppId = this.currentApp.id;

    // Add editApp as a new app with no id. currentApp loses it's id here as well.
    this.editingOrNewApp.id = undefined; // THIS IS CHANGING currentApp.id, but then it get's reset to currentAppId below ... so... ok? I guess? It doesn't seem like the right way. But I will leave it for now. 

    // Receive the new app's id back from adding.
    const newAppId = this.addAppWithId();

    // Both variables point to the same place in memory so currentApp wants it's id back.
    this.currentApp.id = currentAppId;// Logged: currentApp had id here. But now editApp has an id again. Need to find out is this is a problem. CHECKED: I checked all places editApp is used and it all seems safe as things currently stand.
    this.removeApp(newAppId);
  }

  removeApp(newAppId?: string/*not for newSection*/) {
    // newSection Accoutning Path 3:
    this.apps.forEach(app => {
      /* currentApp is the app from the form with new properties, so I need to find the app in the array with the same id to delete. */
      if (app.id === this.currentApp.id) {
        // newSection Accoutning Path 4: called once.
        this.appRemovingService.initiateAppRemoval(
          // currentApp will get the newAppId in movingOut()
          this.apps, this.currentApp, app, app.position, null, null, newAppId
        );
        // return; Will this work?
      }
    });
  }

  shiftThenAdd() {
    this.positionShift(this.editingOrNewApp.position);
    this.addAppWithoutId();
  }

  addAppWithId() {
    // EXPERIMENT 1
    /* I am currently bypassing appAddingService for expediency, but perhaps I should change this later. */
    // New way: 
    // now setting it to pass the new id back to put into 
    const newAppId = this.appService.addAppWithId(this.editingOrNewApp);
    return newAppId;
  }

  addAppWithoutId() {
    this.appAddingService.addApp(this.editingOrNewApp);
  }

  positionShift(movingToPosition: number) {
    this.positionShiftingService.positionShift(this.apps, null, null, movingToPosition);
  }
}
