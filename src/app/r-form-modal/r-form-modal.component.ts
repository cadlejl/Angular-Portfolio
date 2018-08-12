import { Component, Output, EventEmitter, OnInit, Input, OnChanges, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AppService } from "../service/app.service";

import { App } from "../model/app";

import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'r-form-modal',
  templateUrl: /*'radio-button-modal.component.html'*/ './r-form-modal.component.html',
  styleUrls: ['./r-form-modal.component.css']
})
export class RFormModalComponent implements OnInit, OnChanges { 
  newSection: boolean = true;
  private positions: number[] = [];
  @Output() numberOfSections = new EventEmitter<number[]>();
  private appForm: FormGroup = null;
  private canDelete: boolean = false;
  private currentApp = new App(null, null, null, null, null, null, null);
  @Input() appToEdit: App;
  @Output() wasEdited = new EventEmitter<App>();
  @ViewChild('staticModal') staticModal: ModalDirective;
  private isModalShown: boolean = false;

  constructor(private formB: FormBuilder, private appService: AppService) { }

  ngOnInit() {
    this.getApps();
    this.configureForm();
  }

  //*** EDIT: This should work for now as long as editing is all I'm using OnChanges for.
  ngOnChanges() {
    this.configureForm(this.appToEdit);
    if (this.appToEdit) this.isModalShown = true;
  }
  // ngx-bootstrap modal methods set in template
  // showModal(): void {
  //   this.isModalShown = true;
  // }
  // hideModal(): void {
  //   this.staticModal.hide();
  // }
  // onHidden(): void {
  //   this.isModalShown = false;
  // }

  getApps() {
    this.appService.getApps().subscribe(apps => {
      this.auditPositions(apps);
    })
  }

  auditPositions(apps) {
    let pos = [1];
    apps.forEach(app => {
      let p:number = app.position;
      if (!pos.includes(p, 0)) {
        pos.push(p);
        pos.sort();
      }
    });
    this.numberOfSections.emit(pos);
    pos.push(pos.length + 1); 
    this.positions = pos;
  }

  // Modeled after bugged-out-rebuild.bug-detail.component
  configureForm(editApp?: App) {
    if (editApp) {
      //this.canDelete = true;
      this.currentApp = new App(
        editApp.id,
        editApp.position,
        editApp.title,
        editApp.appUrl,
        editApp.description,
        editApp.imgUrl,
        editApp.gitHubUrl
      );
    }

    this.appForm = this.formB.group({
      position: [ this.currentApp.position,Validators.required ],
      title: [ this.currentApp.title,Validators.required ],
      appUrl: [this.currentApp.appUrl, Validators.required],
      description: [this.currentApp.description, Validators.required],
      imgUrl: [this.currentApp.imgUrl/*, Validators.required*/],
      gitHubUrl: [this.currentApp.gitHubUrl/*, Validators.required*/]
    });
  }

  submitForm(deleteClick?: boolean) {
    this.currentApp.position = +(this.appForm.value["position"]);
    this.currentApp.title = this.appForm.value["title"];
    this.currentApp.appUrl = this.appForm.value["appUrl"];
    this.currentApp.description = this.appForm.value["description"];
    this.currentApp.imgUrl = this.appForm.value["imgUrl"];
    this.currentApp.gitHubUrl = this.appForm.value["gitHubUrl"];

    /* Now, how do we differentiate between adding and editing a bug? A key 
    differece between the two is an edited bug has an id (firebase key),
    and an added bug does not. Therefore: */
    if (this.currentApp.id) {
			if (deleteClick) {
				if (confirm(
					"Are you sure you want to permanently delete this app?"
				)) {
				// this.removeBug();
				}
			} else {
					this.updateApp();
        }
        //this.updateBug(); not sure why this is here.
    } else {
        this.addApp();
    }
    /* ^^^ This all does suggest though that what I said before about dbRef
    bringing in a unique id is incorrect. We needed .key to bring that in. */
    
    // This has to be moved due to modal issue addressed in lecture 130
    // this.freshForm();
  }

  addApp() {
    this.appService.addApp(this.currentApp);
		this.freshForm();
  }

  updateApp() {
    this.appService.updateApp(this.currentApp);
    this.freshForm();
  }

  freshForm() {
    this.appForm.reset(/*{ from bug tracking app
			status: this.statuses.Logged, 
			severity: this.severities.Severe 
    }*/);
    
    this.cleanApp();
  }

  cleanApp() {
    this.currentApp = new App(null, null, null, null, null, null, null);
    if (this.appToEdit){
      this.appToEdit = new App(null, null, null, null, null, null, null);
      this.wasEdited.emit(this.appToEdit);
    }
  }

  // Extra position removed if app is to be added to a preexisting section.
  newSectionChange(newSection) {
    let p = this.positions;
    if (!newSection) {
      p.pop();
    }
    else p.push(p.length + 1);
    this.positions = p;
  }
}
