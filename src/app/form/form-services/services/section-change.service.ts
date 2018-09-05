import { Injectable } from '@angular/core';
import { FormServicesModule } from '../form-services.module';
import { App } from "../../../model/app";


@Injectable({ providedIn: FormServicesModule })
export class SectionChangeService {

  newSectionChange(newSection: boolean, positions: number[]) {
    if (!newSection) positions.pop();
    else positions.push(positions.length + 1);
    return positions;
  }

  /* Called by RFormModal.ngOnChanges(): If editPosition has only one app in it, there should not be an extra position available in the positions array, as to move the app to the last position would shift that position's current occupants down 1 place. */
  editing(apps: App[], positions: number[], editPosition: number) {
    let pos = 0;
    apps.forEach(app => {
      if (app.position === editPosition) pos++;
    });
    if (pos === 1) positions.pop();
    return positions;
  }
}
