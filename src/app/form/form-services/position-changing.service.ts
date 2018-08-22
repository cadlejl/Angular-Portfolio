import { Injectable } from '@angular/core';

import { App } from "../../model/app";

import { AppRemovingService } from "../form-services/app-removing.service";
import { AppAddingService } from "../form-services/app-adding.service";
import { PositionShiftingService } from './position-shifting.service';

@Injectable({
  providedIn: 'root'
})
export class PositionChangingService {

  constructor(
    private appRemovingService: AppRemovingService,
    private appAddingService: AppAddingService,
    private positionShiftingService: PositionShiftingService
  ) { }

  changePositions(currentApp: App, apps: App[], newSection: Boolean) {
    let editApp = currentApp;
    console.log(editApp);
    apps.forEach(app => {
      if (app.id === editApp.id) {
        this.appRemovingService.removeApp(apps, app.position, null, app);
        console.log(editApp);
        // return;
      }
    });
    console.log(editApp);
    editApp.id = null;
    console.log(editApp);
    if (newSection) {
      this.positionShiftingService.positionShift(
        apps, 
        editApp.position
      );
    }
    this.appAddingService.addApp(editApp);
    console.log(editApp, 'changePositions just added editApp');
  }
}
