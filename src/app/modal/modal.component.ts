import { Component } from '@angular/core';
// import { ModalDirective } from 'ngx-bootstrap/modal';

import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";


import { App } from "../model/app";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent { 
  positions: number[] = [1,2,3,4,5,6,7];
  // description;

  model = new App(1, 3, "Test App", "something.com", "Ima App, Yo!", "another.com", "onemore.com");

  // constructor() {
  //   this.description = this.model.description;
  // }
}
