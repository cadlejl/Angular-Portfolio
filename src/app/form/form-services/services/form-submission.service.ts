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
  private textarea: string;
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
    this.textarea = this.appForm.value["description"];
    this.escapeVal();
    this.passFormValuesInto_currentApp();
    this.addEditDelete();
  }

  escapeVal() { 
    let tA = this.textarea;
    let br = '<br>';
    //textarea is reference to that object, replaceWith is string that will replace the encoded return
    tA = escape(tA); //encode textarea string's carriage returns

    for (let i = 0; i < tA.length; i++) { 
      //loop through string, replacing carriage return encoding with HTML break tag
      if (tA.indexOf("%0D%0A") > -1) { 
        //Windows encodes returns as \r\n hex
        tA = tA.replace("%0D%0A", br)
      }
      else if (tA.indexOf("%0A") > -1) { 
        //Unix encodes returns as \n hex
        tA = tA.replace("%0A", br)
      }
      else if (tA.indexOf("%0D") > -1) { 
        //Macintosh encodes returns as \r hex
        tA = tA.replace("%0D", br)
      }
    }
    //unescape all other encoded characters
    tA = unescape(tA);
    this.textarea = tA;
  }

  ///*** POPULATE CURRENTAPP FROM APPFORM (R-FORM-MODAL.COMPONENT) ***///
  passFormValuesInto_currentApp() {
    this.currentApp.position = +(this.appForm.value["position"]);
    this.currentApp.title = this.appForm.value["title"];
    this.currentApp.appUrl = this.appForm.value["appUrl"];
    // this.currentApp.description = this.appForm.value["description"];
    this.currentApp.description = this.textarea;
    this.currentApp.imgUrl = this.appForm.value["imgUrl"];
    this.currentApp.gitHubUrl = this.appForm.value["gitHubUrl"];
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
    if (this.positionChanged) {
      this.positionChangingService.changePositions(this.apps, this.currentApp, this.newSection);
    }
    else this.appUpdatingService.updateApp(this.currentApp);
  }

  confirmAndDelete(apps, currentApp) {
    if (confirm("Are you sure you want to permanently delete this app?")) {

      //newSection investigation: property not used; need to initiate removal regardless, so probably need to pass newSection
      this.appRemovingService.initiateAppRemoval(
        apps, currentApp, null, null, currentApp.position/*no position change*/, this.deleteClick
      );
      }
  }
}
