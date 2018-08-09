import { Component, OnInit } from '@angular/core';

import { App } from "../model/app";
import { Section } from "../model/section";

import { AppService } from "../service/app.service";


@Component({
  selector: 'app-showcase',
  templateUrl: './app-showcase.component.html',
  styleUrls: ['./app-showcase.component.css']
})
export class AppShowcaseComponent implements OnInit {

  private apps: App[] = [];
  private showcaseNumberOfSections: number[];
  private sections: Section[] = [];
  private currentApp = new App(null, null, null, null, null, null, null);
  private keys;
  //public appAdded = false;


  constructor(public appService: AppService) {}

  ngOnInit() {
    //this.getApps();
  }

  // ngOnChanges() {
  //   console.log(this.showcaseNumberOfSections);
  //   this.assembleSections();
  // }
  

  assembleSections(sections) {
    this.getApps();
    let a: App[] = [];
    sections.forEach(num => {
      this.apps.forEach(app => {
        if (app.position === num) a.push(app);
      });
      this.sections.push({
        number: num,
        apps: a
      })
    });
  }
  
  getApps() {
    this.appService.getApps().subscribe(serviceApps => {
      this.apps = serviceApps;
      this.appService.getKeys().subscribe(serviceKeys => {
        this.keys = serviceKeys;
        for (let i = 0; i < this.apps.length; i++) {
          this.apps[i].id = this.keys[i].key;
        }
        //console.log(this.apps, 'showcase');
      })
    })
  }
}
