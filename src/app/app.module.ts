import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ModalModule } from "ngx-bootstrap/modal";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppShowcaseComponent } from './app-showcase/app-showcase.component';
import { AppDetailsComponent } from './app-details/app-details.component';
import { AppFormComponent } from './app-form/app-form.component';
import { ModalComponent } from './modal/modal.component';
import { AppSectionComponent } from './app-section/app-section.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AppShowcaseComponent,
    AppDetailsComponent,
    AppFormComponent,
    ModalComponent,
    AppSectionComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
