import { Component } from '@angular/core';
// import { ModalDirective } from 'ngx-bootstrap/modal';

import { App } from "../model";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent { 
  positions: number[] = [1,2,3,4,5,6,7];

  model = new App(1);
}
