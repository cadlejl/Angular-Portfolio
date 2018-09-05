import { Component, OnInit } from '@angular/core';

import { App } from "../model/app";
import { Section } from "../model/section";

import { AppService } from "../service/app.service";

import { AppDataFetchingService } from "../service/app-data-fetching.service";


@Component({
  selector: 'app-showcase',
  templateUrl: './app-showcase.component.html',
  styleUrls: ['./app-showcase.component.css']
})
export class AppShowcaseComponent implements OnInit {

  private apps: App[] = [];
  private showcaseNumberOfSections: number[];
  private sections: Section[] = [];
  private currentApp = new App(null, null, null/*, null, null, null, null*/);
  private keys = [];
  private appToEdit: App;
  //public appAdded = false;

  constructor(
    private appService: AppService,
    private appDataFetchingService: AppDataFetchingService
  ) {}

  ngOnInit() {
    this.getApps();
  }

  assembleSections($sections: number[]) {
    this.sections = []; // Holds its value until reset here.
    let a: App[] = [];
    $sections.forEach(num => {
      this.apps.forEach(app => {
        if (app.position === num) a.push(app);
      });
      this.sections.push({
        number: num,
        apps: a
      })
      a = [];
    });
  }

  getApps() {
    this.appDataFetchingService.subject.subscribe({
      next: x => this.apps = x
    }); 
  }

  // getApps() {
  //   this.appService.getApps().subscribe(serviceApps => {
  //     this.apps = serviceApps;
  //     this.appService.getKeys().subscribe(serviceKeys => {
  //       this.keys = serviceKeys;
  //       for (let i = 0; i < this.apps.length; i++) {
  //         this.apps[i].id = this.keys[i].key;
  //       }
  //     })
  //   })
  // }
}
