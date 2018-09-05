import { Injectable } from '@angular/core';

import { AppService } from "../../../service/app.service";

import { App } from "../../../model/app";

import { FormServicesModule } from '../form-services.module';

@Injectable({ providedIn: FormServicesModule })
export class AppAddingService {
  constructor(private appService: AppService) { }

  addApp(currentApp: App) {
      this.appService.addApp(currentApp);
  }
}
