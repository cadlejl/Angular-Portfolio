import { Injectable } from '@angular/core';

import { AppService } from "../../service/app.service";

import { App } from "../../model/app";

@Injectable({
  providedIn: 'root'
})
export class AppAddingService {

  constructor(private appService: AppService) { }

  addApp(currentApp: App/*, editApp?: App*/) {
    // if (!editApp) {
      this.appService.addApp(currentApp);
    // } 
    // else {
    //   this.appService.addApp(editApp);
    // }
  }
}
