import { Injectable, Output, EventEmitter  } from '@angular/core';

import { App } from "../../model/app";

@Injectable({
  providedIn: 'root'
})
export class PositionsSettingService {
  // @Output() numberOfSections = new EventEmitter<number[]>(); 
  // positions(apps, numberOfSections) {
  //   // Audit apps for their positions
  //   let pos = this.setPositions(apps);
  //   // Tell showcase how many sections it needs
  //   numberOfSections.emit(pos);
  //   // Assure the form has at least 1 position available
  //   if (apps.length > 0) pos.push(pos.length + 1);
  //   // Set positions for newSectionChange()
  //   return pos;
  // }

  setPositions(apps: App[]) {
    let positions = [1];
    apps.forEach(app => {
      let p:number = app.position;//.valueOf(); I don't remember why this was here or if I really need it.
      if (!positions.includes(p)) {
        positions.push(p);
      }
    });
    // positions = this.sortPositions(positions);
    positions.sort((n1,n2) => n1 - n2);
    return positions;
  }

  // sortPositions(pos: number[]) {

  //   let positions = pos.sort((n1,n2) => n1 - n2);


  //   // let positions = [];


  //   // let pos_i = 0;
  //   // for (let i = 0; pos.length > 0;) {
  //   //   if (pos_i >= pos.length) pos_i = 0;
  //   //   if (pos[pos_i] === i+1) {
  //   //     positions[i] = +(pos.splice(pos_i, 1));
  //   //     i++;
  //   //   }
  //   //   pos_i++;
  //   // }
  //   return positions;
  // }
}
