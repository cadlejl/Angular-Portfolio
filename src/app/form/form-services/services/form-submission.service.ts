import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { App } from "../../../model/app";

import { Observable } from "rxjs";
import { AppAddingService } from "./app-adding.service";
import { AppRemovingService } from "./app-removing.service";
import { PositionChangingService } from "./position-changing.service";
import { PositionShiftingService } from "./position-shifting.service";
import { FormServicesModule } from '../form-services.module';
import { AppUpdatingService } from './app-updating.service';

@Injectable({ providedIn: FormServicesModule })
export class FormSubmissionService {
  constructor(
    private appRemovingService: AppRemovingService,
    private positionChangingService: PositionChangingService,
    private positionShiftingService: PositionShiftingService,
    private appAddingService: AppAddingService,
    private appUpdatingService: AppUpdatingService
  ) { }


  ///*** FORM SUBMISSION ***///
  private appForm: FormGroup;
  private apps: App[];
  private currentApp: App;
  private positionChanged: boolean;
  private newSection: boolean;
  private deleteClick: boolean;
  public observable = Observable.create(observer => { observer.complete(); });

  formSubmission(
    appForm: FormGroup, apps: App[], currentApp: App, positionChanged: boolean,
    newSection: boolean, deleteClick: boolean
  ) {
    this.appForm = appForm;
    this.apps = apps;
    this.currentApp = currentApp;
    this.positionChanged = positionChanged;
    this.newSection = newSection;
    this.deleteClick = deleteClick;
    // Put form values into currentApp.
    this.passFormValuesInto_currentApp();
    this.addEditDelete();
  }


  ///*** POPULATE CURRENTAPP FROM APPFORM (R-FORM-MODAL.COMPONENT) ***///
  passFormValuesInto_currentApp(/*currentApp: App, appForm: FormGroup*/) {
    this.currentApp.position = +(this.appForm.value["position"]);
    this.currentApp.title = this.appForm.value["title"];
    this.currentApp.appUrl = this.appForm.value["appUrl"];
    this.currentApp.description = this.appForm.value["description"];
    this.currentApp.imgUrl = this.appForm.value["imgUrl"];
    this.currentApp.gitHubUrl = this.appForm.value["gitHubUrl"];
    // I don't think it's any longer necessary to send this value back to rFormModal.
    //return currentApp;
  }

  addEditDelete(/*apps, currentApp, positionChanged, newSection, deleteClick?*/) {
    // Is the app new or preexisting?
    if (!this.currentApp.id) this.addNewApp();


    // If preexisting, send off to editing.
    else this.edit_or_delete_pre_existing_app();
  }

  //** Add a new app: 1 method **//
  addNewApp() {
    if (this.newSection) {
      this.positionShiftingService.positionShift(this.apps, this.currentApp.position/*new position*/);
    }
    this.appAddingService.addApp(this.currentApp);
    // this.freshForm();
    return this.observable;
  }


  //** Edit a preexisting app: 3 mehtods **//
  edit_or_delete_pre_existing_app() {
    if (!this.deleteClick) this.edit();

    //newSection investigation: property not used 
    else this.confirmAndDelete(this.apps, this.currentApp);
  }

  edit() {
    // Assuming I will need an "else" here eventually.
    // SEEMS PROBLEMATIC that this is THE edit path and I'm sending off on a path here based solely on positonChanged.
    // But on second thought maybe this is fine. Since I'm passing in the currentApp as is in the form, it should get updated along with the position. I just need to call update here after the condition in case the position had not changed.
    // Interestingly, AUS takes positionChanged, but doesn't use it. Thought of refactoring, but I think this path is right.
    if (this.positionChanged) {
      this.positionChangingService.changePositions(this.apps, this.currentApp, this.newSection);
    }
    else this.appUpdatingService.updateApp(this.currentApp);// should this ba an else if on currentApp with error handling in the end? Hard to see how currentApp could ever not have a value.
  }

  confirmAndDelete(apps, currentApp) {
    if (confirm("Are you sure you want to permanently delete this app?")) {
      // this.appRemovingService.delete(apps, currentApp.position/*no position change*/, currentApp);

      //newSection investigation: property not used; need to initiate removal regardless, so probably need to pass newSection
      this.appRemovingService.initiateAppRemoval(
        apps, currentApp, null, null, currentApp.position/*no position change*/, this.deleteClick
      );
      }
  }
}
