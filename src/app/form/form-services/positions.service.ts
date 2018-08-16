import { Injectable } from '@angular/core';

import { App } from "../../model/app";

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
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
  }
}
