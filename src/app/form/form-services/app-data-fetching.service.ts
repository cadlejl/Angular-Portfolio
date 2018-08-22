import { Injectable } from '@angular/core';

import { AppService } from "../../service/app.service";
import { PositionsSettingService } from "../form-services/positions-setting.service";

@Injectable({
  providedIn: 'root'
})
export class AppDataFetchingService {

  // constructor(
  //   private appService: AppService, 
  //   private positionsSettingService: PositionsSettingService
  // ) { }

  // getApps() {
  //   let apps
  //   this.appService.getApps().subscribe(serviceApps => {
  //     apps = serviceApps;
  //     this.appService.getKeys().subscribe(serviceKeys => {
  //       let keys = serviceKeys;
  //       for (let i = 0; i < apps.length; i++) {
  //         apps[i].id = keys[i].key;
  //       }
  //     })
  //     this.positionsSettingService.setPositions(apps);
  //   })
  //   return apps;
  // }
}
