import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ModalModule, ButtonsModule } from "ngx-bootstrap";

import { FormsModule } from "@angular/forms"; // Uncomment for TDForms
import { ReactiveFormsModule } from "@angular/forms";

import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Referencing sticky-notes-fb as guide
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from '../environments/environment';
import { AppService } from "./service/app.service";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppShowcaseComponent } from './app-showcase/app-showcase.component';
import { AppDetailsComponent } from './app-details/app-details.component';
//import { TDFormModalComponent } from './td-form-modal/td-form-modal.component';
import { RFormModalComponent } from "./r-form-modal/r-form-modal.component";
import { AppSectionComponent } from './app-section/app-section.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AppShowcaseComponent,
    AppDetailsComponent,
    //TDFormModalComponent,
    RFormModalComponent,
    AppSectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatRadioModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase /*,'my-app-name'*/)
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
