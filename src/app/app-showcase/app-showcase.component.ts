import { Component, OnInit } from '@angular/core';

import { App } from "../model/app";

import { AppService } from "../service/app.service";


@Component({
  selector: 'app-showcase',
  templateUrl: './app-showcase.component.html',
  styleUrls: ['./app-showcase.component.css']
})
export class AppShowcaseComponent implements OnInit {

  private apps: App[] = [];
  private currentApp = new App(null, null, null, null, null, null, null);
  private keys;
  //public appAdded = false;

  constructor(public appService: AppService) {}

  ngOnInit() {
    this.appService.getApps().subscribe(serviceApps => {
      this.apps = serviceApps;
      this.appService.getKeys().subscribe(serviceKeys => {
        this.keys = serviceKeys;
        for (let i = 0; i < this.apps.length; i++) {
          this.apps[i].key = this.keys[i].key;
        }
        // console.log(this.apps);
      })
    })
  }
}
