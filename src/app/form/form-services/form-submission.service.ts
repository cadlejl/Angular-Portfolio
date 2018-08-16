import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { App } from "../../model/app";

@Injectable({
  providedIn: 'root'
})
export class FormSubmissionService {

  constructor() { }

  receiveFormValues(appForm: FormGroup) {
    let currentApp = new App;
    currentApp.position = +(appForm.value["position"]);
    currentApp.title = appForm.value["title"];
    currentApp.appUrl = appForm.value["appUrl"];
    currentApp.description = appForm.value["description"];
    currentApp.imgUrl = appForm.value["imgUrl"];
    currentApp.gitHubUrl = appForm.value["gitHubUrl"];
    return currentApp;
  }
}
