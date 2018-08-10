import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { App } from '../model/app';

@Component({
  selector: 'app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.css']
})
export class AppDetailsComponent implements OnInit {
  @Input() app: App;
  @Output() appToEdit = new EventEmitter<App>();
  private orientation;

  ngOnInit() {
    this.orientation = this.app.position % 2;
  }

  edit(app: App) {
    console.log(app.title);
    this.appToEdit.emit(app);
  }
}
