import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { App } from '../model/app';
import { Section } from '../model/section';

@Component({
  selector: 'app-section',
  templateUrl: './app-section.component.html',
  styleUrls: ['./app-section.component.css']
})
export class AppSectionComponent implements OnInit, OnChanges {
   apps: App[];
  //@Output() showcaseSections = new EventEmitter<number[]>();
  //private sectionApps: App[]; // Apps that go in one section
  @Input() section: Section;
  @Output() appToEdit = new EventEmitter<App>();
  

  // constructor() { console.log(this.section, 'sec-onchanges'); }
  ngOnInit() { 
    // console.log(this.section, 'sec-onchanges'); 
  }

  ngOnChanges() {
    this.apps = this.section.apps;

    // console.log(this.section, 'sec-onchanges');
    // this.auditSections();
    // this.setApps();
    //this.showcaseSections.emit(this.sectionNumbers);
  }

  // auditSections() {
  //   let sec = [0];
  //   this.apps.forEach(app => {
  //     let p:number = app.position;
  //     if (!sec.includes(p, 0)) {
  //       sec.push(p);
  //       sec.sort();
  //     }
  //   });
  //   this.sectionNumbers = sec;
  // }

  // setApps() {
  //   this.sectionNumbers.forEach(section => {
  //     this.apps.forEach(app => {
  //       if (app.position === section) {
  //         this.sectionApps.push(app);
          
  //       }
  //     });
  //   });
  // }
  
  edit(app: App) {
    this.appToEdit.emit(app);
  }
}
