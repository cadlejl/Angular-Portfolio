import { Injectable } from '@angular/core';

import { App } from "../../../model/app";

import { FormServicesModule } from '../form-services.module';

@Injectable({ providedIn: FormServicesModule })
export class PositionsSettingService {

  setPositions(apps: App[]) {
    let positions = this.set(apps);
    positions.sort((n1,n2) => n1 - n2);
    return positions;
  }

  set(apps) {
    let positions = [1];
    // Iterate apps array, pushing positons that aren't already included in positions array.
    apps.forEach(app => {
      let p:number = app.position;
      if (!positions.includes(p)) positions.push(p);
    });
    return positions;
  }
}
