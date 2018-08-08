import { Component } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AppService } from "../service/app.service";

import { App } from "../model/app";

@Component({
  selector: 'r-form-modal',
  templateUrl: /*'radio-button-modal.component.html'*/ './r-form-modal.component.html',
  styleUrls: ['./r-form-modal.component.css']
})
export class RFormModalComponent { 
  
  // description;
  //model = new App(1, 3, "Test App", "something.com", "Ima App, Yo!", "another.com", "onemore.com");

  // private newPosition = true;
  newSection: boolean = true;
  // private sectionBools = [ true, false ];

  //private apps: App[];
  positions: number[] = [];
  //positions: number[] = [1,2,3,4,5,6,7];
  private appForm: FormGroup = null;

  private currentApp = new App(null, null, null, null, null, null, null);

  constructor(private formB: FormBuilder, private appService: AppService) { }

  ngOnInit() {
    this.getApps();
    this.configureForm();
  }

  getApps() {
    this.appService.getApps().subscribe(apps => {
        for (let i = 0; i <= apps.length; ) {
          this.positions.push(++i);
        }
    })
  }

  // Modeled after bugged-out-rebuild.bug-detail.component
  configureForm(app?: App) {
    if (app) {
      //this.canDelete = true;
      this.currentApp = new App(
        app.id,
        app.position,
        app.title,
        app.appUrl,
        app.description,
        app.imgUrl,
        app.gitHubUrl
      );
    }

    this.appForm = this.formB.group({
      position: [ this.currentApp.position/*,Validators.required*/ ],
      title: [ this.currentApp.title,Validators.required ],
      appUrl: [this.currentApp.appUrl, Validators.required],
      description: [this.currentApp.description, Validators.required],
      imgUrl: [this.currentApp.imgUrl/*, Validators.required*/],
      gitHubUrl: [this.currentApp.gitHubUrl/*, Validators.required*/]
    });
  }

  

  submitForm(/*deleteClick?: boolean*/) {
    this.currentApp.position = this.appForm.value["position"];
    this.currentApp.title = this.appForm.value["title"];
    this.currentApp.appUrl = this.appForm.value["appUrl"];
    this.currentApp.description = this.appForm.value["description"];
    this.currentApp.imgUrl = this.appForm.value["imgUrl"];
    this.currentApp.gitHubUrl = this.appForm.value["gitHubUrl"];

    /* Now, how do we differentiate between adding and editing a bug? A key 
    differece between the two is an edited bug has an id (firebase key),
    and an added bug does not. Therefore: */
    if (this.currentApp.id) {
			// if (deleteClick) {
			// 	if (confirm(
			// 		"Are you sure you want to permanently delete this app?"
			// 	)) {
			// 	this.removeBug();
			// 	}
			// } else {
			// 		this.updateBug();
      //   }
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
		//this.freshForm();
  }

  newSectionChange(newSection) {
    let p = this.positions;
    if (!newSection) {
      p.pop();
    }
    else p.push(p.length + 1);
    this.positions = p;
  }
}
