import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormServicesModule } from "./form-services/form-services.module";

import { ModalModule, ButtonsModule } from "ngx-bootstrap";

import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//import { TDFormModalComponent } from './form/td-form-modal/td-form-modal.component';
import { RFormModalComponent } from "./r-form-modal/r-form-modal.component";


@NgModule({
  imports: [
    CommonModule,
    FormServicesModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    BrowserAnimationsModule
  ],
  declarations: [
    // TDFormModalComponent,
    RFormModalComponent
  ],
  exports: [ 
    RFormModalComponent
  ]
})
export class FormModule { }
