import { Component, OnInit, Input } from '@angular/core';
import { App } from '../model/app';

@Component({
  selector: 'app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.css']
})
export class AppDetailsComponent implements OnInit {
  @Input() app: App;
  private orientation;
  constructor() { }

  ngOnInit() {
    this.orientation = this.app.position % 2;
  }

}
