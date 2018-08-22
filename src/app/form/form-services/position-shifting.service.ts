import { Injectable } from '@angular/core';

import { App } from '../../model/app';

import { AppUpdatingService } from "../form-services/app-updating.service";

@Injectable({
  providedIn: 'root'
})
export class PositionShiftingService {

  constructor(private appUpdatingService: AppUpdatingService) { }

  positionShift(apps: App[], shiftPosition: number, deleting?: boolean) {
    apps.forEach(app => {
      if (!deleting) {
        if (app.position >= shiftPosition) {
          app.position += 1;
          this.appUpdatingService.updateApp(app);
        }
      }
      else {
        if (app.position > shiftPosition) {
          console.log(app.position, shiftPosition);
          app.position -= 1;
          console.log(app.position);
          this.appUpdatingService.updateApp(app);
        }
      }
    });
  }
}
