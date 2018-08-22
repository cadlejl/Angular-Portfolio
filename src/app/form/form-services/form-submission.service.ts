import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { App } from "../../model/app";

// import { AppService } from "../../service/app.service";
// import { PositionsService } from "../form-services/positions.service";
// import { SectionChangeService } from "../form-services/section-change.service";
// import { FormConfigurationService } from "../form-services/form-configuration.service";
import { AppAddingService } from "../form-services/app-adding.service";
import { AppUpdatingService } from "../form-services/app-updating.service";
import { AppRemovingService } from "../form-services/app-removing.service";
import { PositionChangingService } from "../form-services/position-changing.service";
import { PositionShiftingService } from "../form-services/position-shifting.service";

@Injectable({
  providedIn: 'root'
})
export class FormSubmissionService {

  constructor(
    private appRemovingService: AppRemovingService,
    private positionChangingService: PositionChangingService,
    private appUpdatingService: AppUpdatingService,
    private positionShiftingService: PositionShiftingService,
    private appAddingService: AppAddingService
  ) { }

  receiveFormValues(currentApp: App, appForm: FormGroup) {
    currentApp.position = +(appForm.value["position"]);
    currentApp.title = appForm.value["title"];
    //currentApp.appUrl = appForm.value["appUrl"];
    currentApp.description = appForm.value["description"];
    //currentApp.imgUrl = appForm.value["imgUrl"];
    //currentApp.gitHubUrl = appForm.value["gitHubUrl"];
    return currentApp;
  }


  submitForm(
    apps: App[],
    currentApp: App,
    positionChanged: boolean,
    newSection: boolean,
    deleteClick?: boolean
  ) {
    if (currentApp.id) {
			if (deleteClick) { 
				if (confirm("Are you sure you want to permanently delete this app?")) {
        this.appRemovingService.removeApp(apps, currentApp.position, currentApp);
				}
      } else {
          // let a = this.currentApp;
          // this.removeApp(this.currentApp.position);
          // this.currentApp = a;
          // this.addApp();
          if (positionChanged) {
            this.positionChangingService.changePositions(currentApp, apps, newSection);
          }
          //this.appUpdatingService.updateApp(currentApp, null, positionChanged);
          console.log(currentApp, 'submitForm would have just called appUpdatingService which added currentApp');
          // if (!app) this.freshForm();
        }
    } else {
        if (newSection) {
          this.positionShiftingService.positionShift(
            apps, 
            currentApp.position
          );
        }
        this.appAddingService.addApp(currentApp);
        // this.freshForm();
    }
  }
}
