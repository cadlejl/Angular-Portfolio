import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { App } from '../model/app';
import { Section } from '../model/section';

@Component({
  selector: 'app-section',
  templateUrl: './app-section.component.html',
  styleUrls: ['./app-section.component.css']
})
export class AppSectionComponent implements OnChanges {
  apps: App[];
  @Input() section: Section;
  @Output() appToEdit = new EventEmitter<App>();

  ngOnChanges() {
    this.apps = this.section.apps;
  }
  
  edit(app: App) {
    this.appToEdit.emit(app);
  }
}
