import { Component } from '@angular/core';

import { App } from "../../model/app";

@Component({
  selector: 'td-form-modal',
  templateUrl: './td-form-modal.component.html',
  styleUrls: ['./td-form-modal.component.css']
})
export class TDFormModalComponent { 
  positions: number[] = [1,2,3,4,5,6,7];
  // description;

  model = new App(1, 3, "Test App", "something.com", "Ima App, Yo!", "another.com", "onemore.com");

  private newPosition = true;

  private currentApp = new App(null, null, null, null, null, null, null);

  // constructor() {
  //   this.description = this.model.description;
  // }

  // ngOnInit() {
  //   this.configureForm();
  // }

  // Modeled after bugged-out-rebuild.bug-detail.component
  // configureForm(app?: App) {
  //   if (app) {
  //     //this.canDelete = true;
  //     this.currentApp = new App(
  //       app.id,
  //       app.position,
  //       app.title,
  //       app.appUrl,
  //       app.description,
  //       app.imgUrl,
  //       app.gitHubUrl
  //     );
  //   }
  // }

  // submitForm(/*deleteClick?: boolean*/) {
  //   this.currentApp.title = this.appForm.value["title"];
  //   this.currentApp.status = this.bugForm.value["status"];
  //   this.currentApp.severity = this.bugForm.value["severity"];
  //   this.currentApp.description = this.bugForm.value["description"];

  //   /* Now, how do we differentiate between adding and editing a bug? A key 
  //   differece between the two is an edited bug has an id (firebase key),
  //   and an added bug does not. Therefore: */
  //   if (this.currentBug.id) {
	// 		if (deleteClick) {
	// 			if (confirm(
	// 				"Are you sure you want to permanently delete this bug?"
	// 			)) {
	// 			this.removeBug();
	// 			}
	// 		} else {
	// 				this.updateBug();
  //       }
  //       //this.updateBug(); not sure why this is here.
  //   } else {
  //       this.addBug();
  //   }
  //   /* ^^^ This all does suggest though that what I said before about dbRef
  //   bringing in a unique id is incorrect. We needed .key to bring that in. */
    
  //   // This has to be moved due to modal issue addressed in lecture 130
  //   // this.freshForm();
  // }
}
