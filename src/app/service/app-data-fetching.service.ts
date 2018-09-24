import { Injectable } from '@angular/core';

import { AppService } from "./app.service";

import { App } from "../model/app";

import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AppDataFetchingService {
  private apps: App[] = [];
  public subject = new BehaviorSubject(null);
  // public sendSubject = Observable.create(observer { 
  //   observer.next(this.subject);
  // })

  constructor(private appService: AppService) { 
    this.getApps();
  }

  getApps() {
    this.appService.getApps().subscribe(serviceApps => {
      this.apps = serviceApps;
      this.appService.getKeys().subscribe(serviceKeys => {
        let keys = serviceKeys;

        this.apps.forEach((app, i) => {
          this.apps[i].id = keys[i].key;
        });
        // for (let i = 0; i < this.apps.length; i++) {
        //   this.apps[i].id = keys[i].key;
        // }
      })
      this.subject.next(this.apps);
    })
  }
}
