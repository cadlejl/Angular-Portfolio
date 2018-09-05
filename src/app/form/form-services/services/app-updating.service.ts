import { Injectable } from '@angular/core';

import { App } from "../../../model/app";

import { AppService } from "../../../service/app.service";
import { FormServicesModule } from '../form-services.module';

@Injectable({ providedIn: FormServicesModule })
export class AppUpdatingService {
  constructor(private appService: AppService) { }

  updateApp(app: App) {
    this.appService.updateApp(app);
    // if (!app) this.freshForm();
    // return this.observable;
  }
}
