import { Injectable } from '@angular/core';

import { App } from "../../model/app";

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  constructor() { }

  setPositions(apps: App[]) {
    let pos = [1];
    apps.forEach(app => {
      let p:number = app.position;
      if (!pos.includes(p)) {
        pos.push(p);
        pos.sort();
      }
    });
    return pos;
    // this.numberOfSections.emit(pos);
    // if (this.apps.length > 0) pos.push(pos.length + 1); 
    // this.positions = pos;
  }
}
