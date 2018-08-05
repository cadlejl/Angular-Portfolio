import { Component, ViewChild, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-portfilio';

  @ViewChild('childModal') childModal: ModalDirective;
 
  /*@Output()*/ showChildModal(): void {
    this.childModal.show();
  }
 
  hideChildModal(): void {
    this.childModal.hide();
  }
  
}
