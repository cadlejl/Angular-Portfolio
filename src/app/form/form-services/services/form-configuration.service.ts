import { Injectable } from '@angular/core';

import { App } from "../../../model/app";

import { FormBuilder, Validators } from "@angular/forms";
import { FormServicesModule } from '../form-services.module';

@Injectable({ providedIn: FormServicesModule })
export class FormConfigurationService {
  private currentApp: App;

  // Modeled after bugged-out-rebuild.bug-detail.component
  configureCurrentApp(editApp: App) {
    this.currentApp = new App(
      editApp.id,
      editApp.position,
      editApp.title,
      editApp.appUrl,
      editApp.description,
      editApp.imgUrl,
      editApp.gitHubUrl
    );
    return this.currentApp;
  }

  configureForm(currentApp: App, formB: FormBuilder) {
    let appForm = formB.group({
      position: [ currentApp.position,Validators.required ],
      title: [ currentApp.title,Validators.required ],
      appUrl: [currentApp.appUrl, Validators.required],
      description: [currentApp.description, Validators.required],
      imgUrl: [currentApp.imgUrl, Validators.required],
      gitHubUrl: [currentApp.gitHubUrl, Validators.required]
    });
    return appForm;
  }


}
