import { Component, Output, EventEmitter, OnInit, Input, OnChanges, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AppService } from "../../service/app.service";
import { PositionsSettingService } from "../form-services/positions-setting.service";
import { SectionChangeService } from "../form-services/section-change.service";
import { FormConfigurationService } from "../form-services/form-configuration.service";
import { FormSubmissionService } from "../form-services/form-submission.service";
import { AppDataFetchingService } from "../form-services/app-data-fetching.service";
// import { AppAddingService } from "../form-services/app-adding.service";
// import { AppUpdatingService } from "../form-services/app-updating.service";
// import { AppRemovingService } from "../form-services/app-removing.service";
// import { PositionChangingService } from "../form-services/position-changing.service";
// import { PositionShiftingService } from "../form-services/position-shifting.service";

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
  private currentApp = new App(null, null, null/*, null, null, null, null*/);
  private isModalShown: boolean = false;
  private apps: App[];
  private keys;
  private positionChanged = false;

  constructor(
    private formB: FormBuilder, 
    private appService: AppService,
    private positionsSettingService: PositionsSettingService,
    private sectionChangeService: SectionChangeService,
    private formConfigurationService: FormConfigurationService,
    private formSubmissionService: FormSubmissionService,
    private appDataFetchingService: AppDataFetchingService
    // private appAddingService: AppAddingService,
    // private appUpdatingService: AppUpdatingService,
    // private appRemovingService: AppRemovingService,
    // private positionChangingService: PositionChangingService,
    // private positionShiftingService: PositionShiftingService
  ) { }

  ngOnInit() {
    //this.apps = this.appDataFetchingService.getApps();
    //this.positions = this.positionsSettingService.positions(this.apps);

    this.getApps();
    console.log("oninit");
    this.configureForm();
  }

  //*** EDIT: This should work for now as long as editing is all I'm using OnChanges for.
  ngOnChanges() {
    this.configureForm();
    if (this.appToEdit) this.isModalShown = true;
  }

  getApps() {
    // console.log("getApps");
    this.appService.getApps().subscribe(serviceApps => {
      this.apps = serviceApps;
      this.appService.getKeys().subscribe(serviceKeys => {
        this.keys = serviceKeys;
        for (let i = 0; i < this.apps.length; i++) {
          this.apps[i].id = this.keys[i].key;
        }
      })
      // console.log("Before you are here");
      // console.log('You are here! setPositions() should happen next!');
      this.setPositions();
    })
  }

  setPositions() {
    // Audit apps for their positions
    let pos = this.positionsSettingService.setPositions(this.apps);
    // Tell showcase how many sections it needs
    this.numberOfSections.emit(pos);
    // Assure the form has at least 1 position available
    if (this.apps.length > 0) pos.push(pos.length + 1);
    // Set positions for newSectionChange()
    this.positions = pos;
  }

  // Optional parameter from app-details
  configureForm() {
    if (this.appToEdit) {
      this.canDelete = true;
      // If editing, pass app as currentApp to populate form.
      this.currentApp = this.formConfigurationService.configureCurrentApp(this.appToEdit);
    }
    // Configure app properties into a FormBuilder group.
    this.appForm = this.formConfigurationService.configureForm(this.currentApp, this.formB);
  }

  submitForm(deleteClick?: boolean) {
    this.currentApp = this.formSubmissionService.receiveFormValues(this.currentApp, this.appForm);
    this.formSubmissionService.submitForm(
      this.apps,
      this.currentApp,
      this.positionChanged,
      this.newSection,
      deleteClick
    );
  }

  newSectionChange(newSection: boolean) {
    this.positions = this.sectionChangeService.newSectionChange(newSection, this.positions);
  }

  freshForm() {
    this.appForm.reset();
    this.newSection = true;
    this.cleanApp();
  }

  cleanApp() {
    this.currentApp = new App(null, null, null/*, null, null, null, null*/);
    if (this.appToEdit){
      this.appToEdit = new App(null, null, null/*, null, null, null, null*/);
      this.wasEdited.emit(this.appToEdit);
    }
  }
}
