import { 
  Component, Output, EventEmitter, OnInit, Input, OnChanges, ViewChild 
} from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { FormGroup, FormBuilder } from "@angular/forms";

import { App } from "../../model/app";

import { AppService } from "../../service/app.service";

import { PositionsSettingService } from "../form-services/services/positions-setting.service";
import { SectionChangeService } from "../form-services/services/section-change.service";
import { FormConfigurationService } from "../form-services/services/form-configuration.service";
import { FormSubmissionService } from "../form-services/services/form-submission.service";
import { PositionShiftingService } from "../form-services/services/position-shifting.service";

import { AuthGuard } from "../../service/auth.guard";

@Component({
  selector: 'r-form-modal',
  templateUrl: /*'radio-button-modal.component.html'*/ './r-form-modal.component.html',
  styleUrls: ['./r-form-modal.component.css']
})
export class RFormModalComponent implements OnInit, OnChanges { 
  @Input() appToEdit: App;
  @Output() sectionNumbers = new EventEmitter<number[]>(); 
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
  private noPositionChange = false;
  private editing = false;
  private auth = false;
  private noAuth = false;

  constructor(
    private formB: FormBuilder, 
    private appService: AppService,
    private positionsSettingService: PositionsSettingService,
    private sectionChangeService: SectionChangeService,
    private formConfigurationService: FormConfigurationService,
    private formSubmissionService: FormSubmissionService,
    private positionShiftingService: PositionShiftingService,
    private authGuard: AuthGuard
  ) {  }


  ///*** EDITING ***///
  ngOnInit() {
    // Not sure of the status of these two commented lines.
    //this.apps = this.appDataFetchingService.getApps();
    //this.positions = this.positionsSettingService.positions(this.apps);
    this.getApps();
    this.configureForm();
    this.getAuth();
  }

  //*** EDIT: This should work for now as long as editing is all OnChanges is used for.
  // If appToEdit is initialized ...
  ngOnChanges() {
    this.editing = true;
    this.configureForm();
    /* Conditional is necessary because some variables aren't initialized on when onChanges() is first read on component initialization, and because isModalShown will be set to true. This is confusing because I thought onChanges would only run when @Input received a value */
    if (this.appToEdit) {
      // Hold the length
      const p = this.positions.length;
      // Check the number of apps in editApp.position and pop extra position if a shift will occur (if only 1 app in position).
      this.positions = this.sectionChangeService.editing(
        this.apps, 
        this.positions, 
        this.appToEdit.position
      );
      // If a position was popped, disallow newSectionChange to add or remove positions.
      if (p > this.positions.length) this.noPositionChange = true;
      // Causes modal to show.
      this.isModalShown = true;
    }
  }
  ///*** END EDITING ***///


  getAuth() {
    this.authGuard.canActivate().subscribe(auth => {
        this.auth = auth;
      })
  }

  errorMessage() {
    if (!this.auth) {
      this.noAuth = true;
      setTimeout (() => { this.noAuth = false; }, 3000);
    }
  }



  /* Called in template: newSection models radio-button values. Then a position is popped if true or pushed if false, on positions. */
  /* If editing an app in a section with no other app in it, positions had the extra popped off onChanges(), noPositionChange = false, and this code will not run, because the last section will be shifted down one place. */
  newSectionChange() {
    // If editing from a position 
    if (!this.noPositionChange) {
      // Add or remove extra position.
      this.positions = this.sectionChangeService.newSectionChange(this.newSection, this.positions);
    }
  }

  ///*** Populating the apps array and setting the positions array ***///
  // getApps() {
  //   this.appDataFetchingService.subject.subscribe({
  //     next: x => this.apps = x
  //   }); 
  // }

  getApps() {
    // Maybe this work should be done in the service and return just the apps array in a new observable.
    this.appService.getApps().subscribe(serviceApps => {
      this.apps = serviceApps;
      // AngularFire 2 not returning data with keys. Keys are mapped out in service and added in here.
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
    let pos = this.positionsSettingService.setPositions(this.apps);
    // Tell showcase how many sections it needs
    this.sectionNumbers.emit(pos);
    // Assure the form has at least 1 position available
    if (this.apps.length > 0) pos.push(pos.length + 1);
    // Set positions for newSectionChange()
    this.positions = pos;
  }
  ///*** END Populating the apps array and setting the positions array ***///


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
    // MARKED FOR DELETION
    // I suspect currentApp is not needed beyond this point. Thinking I could just send everything to the service and let it take over.
    // this.currentApp = this.formSubmissionService.receiveFormValues(
    //   this.currentApp, this.appForm
    // );

    // this.formSubmissionService.submitForm(
    //   this.apps,
    //   this.currentApp,
    //   this.positionChanged,
    //   this.newSection,
    //   deleteClick
    // );
    // END MARKED FOR DELETION


    /* WPC (without position changing) */
    /* 1st attempt to fix crazy bug */
    //if (this.editing) this.newSection = false;


    // This new code sends all the info at once and lets the service take over.
    this.formSubmissionService.formSubmission(
      this.appForm, this.apps, this.currentApp,
      this.positionChanged, this.newSection, deleteClick
    );

    // It seems like this should be called before calling fSService, but I think it somehow clears the form too soon or something like that, which may be why I put it here.
    this.freshCaller();
  }


  ///*** REFRESH FORM: 3 methods; last set ***///
  freshForm() {
    // With positon select conditioned on not editing, I notice positionChange is true while editing an app that was just added. So I reset it here. 
    this.positionChanged = false;

    this.editing = false;
    this.setPositions();
    this.noPositionChange = false;
    this.newSection = true;
    this.freshApp();
    this.appForm.reset();
    // this.appToEdit = undefined;
  }
  
  freshApp() {
    this.currentApp = new App(null, null, null/*, null, null, null, null*/);
    if (this.appToEdit){
      this.appToEdit = undefined;//new App(null, null, null/*, null, null, null, null*/);
      this.wasEdited.emit(this.appToEdit);
    }
  }

  // In order to call freshForm() after updating. As of this writing, position-shifting.service contains the only calls to appUpdating.service. Updates occur in iteration, so the observable is returned at the end of positionShift().
  freshCaller() {
    /* Subscriber derived from http://reactivex.io/rxjs/manual/overview.html#observable */
    // console.log('just before subscribe');
    // this.positionShiftingService.observable.subscribe({
    //   // next: x => console.log('got value ' + x),
    //   // error: err => console.error('something wrong occurred: ' + err),
    //   complete: () => this.freshForm() //console.log('done'),
    // });
    // console.log('just after subscribe');

    this.formSubmissionService.observable.subscribe({
      complete: () => this.freshForm()
    });

    this.positionShiftingService.observable.subscribe({
      complete: () => this.freshForm()
    });
  }
  ///*** END REFRESH FORM ***///

}
