import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SectionChangeService {

  constructor() { }

  newSectionChange(newSection: boolean, positions: number[]) {
    if (!newSection) positions.pop();
    else positions.push(positions.length + 1);
    return positions;
  }
}
