import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { ModalModule, ButtonsModule/*, BsDropdownModule*/  } from "ngx-bootstrap";

//import { FormsModule } from "@angular/forms";
// import { ReactiveFormsModule } from "@angular/forms";

import { FormModule } from "./form/form.module";

// import { MatRadioModule } from '@angular/material/radio';
//import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Referencing sticky-notes-fb as guide
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from '../environments/environment';
import { AppService } from "./service/app.service";

import { AppDataFetchingService } from "./service/app-data-fetching.service";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppShowcaseComponent } from './app-showcase/app-showcase.component';
import { AppDetailsComponent } from './app-details/app-details.component';
import { AppSectionComponent } from './app-section/app-section.component';
import { IntroComponent } from './intro/intro.component';

import { ModalModule/*, ButtonsModule*/ } from "ngx-bootstrap";


// import { RFormModalComponent } from "./form/r-form-modal/r-form-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AppShowcaseComponent,
    AppDetailsComponent,
    AppSectionComponent,
    IntroComponent,


    // RFormModalComponent
  ],
  imports: [
    BrowserModule,
    //FormsModule,
    //ReactiveFormsModule,
    //BrowserAnimationsModule, // This is imported in FormModule and probably doesn't need to be imported here
    // MatRadioModule,
    ModalModule.forRoot(),
    //ButtonsModule.forRoot(),
    //BsDropdownModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase /*,'my-app-name'*/),
    FormModule
  ],
  exports: [
    // ModalModule,
    // ButtonsModule,
    //AppShowcaseComponent
  ],
  providers: [ AppService, AppDataFetchingService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
