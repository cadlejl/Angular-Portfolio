import { Injectable } from '@angular/core';

import { App } from "../../model/app";

import { AppService } from "../../service/app.service";

@Injectable({
  providedIn: 'root'
})
export class AppUpdatingService {

  constructor(private appService: AppService) { }

  updateApp(currentApp: App, app?: App, positionChanged?: boolean) {
    let a: App;
    app ? a = app : a = currentApp;
    this.appService.updateApp(a);
    //if (!app) this.freshForm();
  }
}
