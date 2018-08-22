import { Injectable } from '@angular/core';

import { AppService } from "../../service/app.service";
import { PositionShiftingService } from "../form-services/position-shifting.service";

import { App } from "../../model/app";

@Injectable({
  providedIn: 'root'
})
export class AppRemovingService {

  constructor(
    private appService: AppService,
    private positionShiftingService: PositionShiftingService
  ) { }

  removeApp(apps: App[], position?: number, currentApp?: App, app?: App) {
    if(!app) {
      this.appService.removeApp(currentApp);
      this.positionShiftingService.positionShift(apps, position, true)
    } else {
      this.appService.removeApp(app);
      apps.forEach(a => {
        if (a.id === app.id) apps.splice(apps.indexOf(a), 1); 
      });
      this.positionShiftingService.positionShift(apps, position, true);
    }
  }
}
