import { Injectable } from '@angular/core';

import { AppService } from "./app.service";


import { App } from "../model/app";

import { Observable, from, BehaviorSubject } from "rxjs";

// I don't know how these got here.
//import { PositionsSettingService } from "../form/form-services/services/positions-setting.service";
// import { ButtonRadioGroupDirective } from 'ngx-bootstrap/buttons';
// import { TabHeadingDirective } from 'ngx-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class AppDataFetchingService {
  private apps: App[] = [];
  public subject = new BehaviorSubject(null);
  // public sendSubject = Observable.create(observer { 
  //   observer.next(this.subject);
  // })

  constructor(private appService: AppService) { 
    //console.log(this.subject, 'constructor');
    this.getApps();
  }

  getApps() {
    //console.log(this.subject, 'before subscribe');
    this.appService.getApps().subscribe(serviceApps => {
      this.apps = serviceApps;
      this.appService.getKeys().subscribe(serviceKeys => {
        let keys = serviceKeys;
        for (let i = 0; i < this.apps.length; i++) {
          this.apps[i].id = keys[i].key;
        }
      })
      //console.log(this.apps, 'before subject');
      this.subject.next(this.apps);
      //console.log(this.apps, 'after subject');
    })
  }
}
