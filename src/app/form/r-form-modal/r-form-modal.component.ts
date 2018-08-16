import { Component, Output, EventEmitter, OnInit, Input, OnChanges, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AppService } from "../../service/app.service";
import { PositionsService } from "../form-services/positions.service";
import { SectionChangeService } from "../form-services/section-change.service";
import { FormConfigurationService } from "../form-services/form-configuration.service";
import { FormSubmissionService } from "../form-services/form-submission.service";
import { AppAddingService } from "../form-services/app-adding.service";

import { App } from "../../model/app";

import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'r-form-modal',
  templateUrl: /*'radio-button-modal.component.html'*/ './r-form-modal.component.html',
  styleUrls: ['./r-form-modal.component.css']
})
export class RFormModalComponent implements OnInit, OnChanges { 
  @Input() appToEdit: App;
  @Output() numberOfSections = new EventEmitter<number[]>(); 
  @Output() wasEdited = new EventEmitter<App>();
  @ViewChild('staticModal') staticModal: ModalDirective;
  private newSection: boolean = true;
  private positions: number[];
  private appForm: FormGroup = null;
  private canDelete: boolean = false;
  private currentApp = new App(null, null, null, null, null, null, null);
  private isModalShown: boolean = false;
  private apps: App[];
  private keys;
  private positionChanged = false;

  constructor(
    private formB: FormBuilder, 
    private appService: AppService,
    private positionService: PositionsService,
    private sectionChangeService: SectionChangeService,
    private formConfigurationService: FormConfigurationService,
    private formSubmissionService: FormSubmissionService,
    private appAddingService: AppAddingService
  ) { }

  ngOnInit() {
    this.getApps();
    this.configureForm();
  }

  //*** EDIT: This should work for now as long as editing is all I'm using OnChanges for.
  ngOnChanges() {
    this.configureForm(this.appToEdit);
    if (this.appToEdit) this.isModalShown = true;
  }

  getApps() {
    this.appService.getApps().subscribe(serviceApps => {
      this.apps = serviceApps;
      this.appService.getKeys().subscribe(serviceKeys => {
        this.keys = serviceKeys;
        for (let i = 0; i < this.apps.length; i++) {
          this.apps[i].id = this.keys[i].key;
        }
      })
      this.setPositions();
    })
  }

  setPositions() {
    // Audit apps for their positions
    let pos = this.positionService.setPositions(this.apps);

    // Tell showcase how many sections it needs
    this.numberOfSections.emit(pos);

    // Assure the form has at least 1 position available
    if (this.apps.length > 0) pos.push(pos.length + 1);

    // Set positions for newSectionChange()
    this.positions = pos;
  }

  // Extra position removed if app is to be added to a preexisting section.
  newSectionChange(newSection: boolean) {
    this.positions = this.sectionChangeService.newSectionChange(newSection, this.positions);
  }

  // Optional parameter from app-details
  configureForm(appToEdit?: App) {
    if (appToEdit) {
      this.canDelete = true;

      // If editing, pass app as currentApp to populate form.
      this.currentApp = this.formConfigurationService.configureCurrentApp(appToEdit);
    }

    // Configure app properties into a FormBuilder group.
    this.appForm = this.formConfigurationService.configureForm(this.currentApp, this.formB);
  }

  submitForm(deleteClick?: boolean) {
    this.currentApp = this.formSubmissionService.receiveFormValues(this.appForm);

    if (this.currentApp.id) {
			if (deleteClick) { 
				if (confirm("Are you sure you want to permanently delete this app?")) {
				this.removeApp(this.currentApp.position);
				}
      } else {
          // let a = this.currentApp;
          // this.removeApp(this.currentApp.position);
          // this.currentApp = a;
          // this.addApp();
          if (this.positionChanged) this.changePositions();
          this.updateApp(null,this.positionChanged);
        }
    } else {
        if (this.newSection) {
          this.positionShift(this.currentApp.position);
        }
        this.addApp();
    }
  }

  addApp(/*editApp?: App*/) {
    // if (!editApp) {
      this.appAddingService.addApp(this.currentApp);
      this.freshForm();
    // } 
    // else {
    //   this.positionShift(editApp.position);
    //   this.appAddingService.addApp(editApp);
    // }
  }

  updateApp(app?: App, positionChanged?: boolean) {
    let a: App;
    app ? a = app : a = this.currentApp;
    this.appService.updateApp(a);
    if (!app) this.freshForm();
  }

  changePositions() {
    let editApp = this.currentApp;
    this.apps.forEach((app, index) => {
      if (app.id === editApp.id) {
        this.removeApp(app.position, app);
        //return;
      }
    });
    editApp.id = null;
    // this.addApp(editApp);
  }

  positionShift(shiftPosition: number, deleting?: boolean) {
    this.apps.forEach(app => {
      if (!deleting) {
        if (app.position >= shiftPosition) {
          app.position += 1;
          this.updateApp(app);
        }
      }
      else {
        if (app.position > shiftPosition) {
          app.position -= 1;
          this.updateApp(app);
        }
      }
    });
  }

  removeApp(position: number, app?: App) {
    if(!app) {
      this.appService.removeApp(this.currentApp);
      this.positionShift(position, true)
    } else {
      this.appService.removeApp(app);
      this.positionShift(position, true);
    }
  }

  freshForm() {
    this.appForm.reset();
    this.newSection = true;
    this.cleanApp();
  }

  cleanApp() {
    this.currentApp = new App(null, null, null, null, null, null, null);
    if (this.appToEdit){
      this.appToEdit = new App(null, null, null, null, null, null, null);
      this.wasEdited.emit(this.appToEdit);
    }
  }

  

}
