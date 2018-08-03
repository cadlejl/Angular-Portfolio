import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppShowcaseComponent } from './app-showcase/app-showcase.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AppShowcaseComponent
  ],
  imports: [
    BrowserModule,
    NgbModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
