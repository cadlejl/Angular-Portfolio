import { Injectable } from "@angular/core";

import { AngularFireDatabase } from "angularfire2/database";

import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { App } from "../model/app";

@Injectable({ providedIn: 'root' })
export class AppService {
	private apps: Observable<any[]>;
  private keys: Observable<any[]>;

	constructor(/*public in sticky notes*/private afdb: AngularFireDatabase) {
    this.apps = afdb.list('/apps/').valueChanges();

		this.keys = afdb.list<App[]>('apps')
			.snapshotChanges().pipe(
				map(actions => actions.map(a => ({
          key: a.key
				})))
			);
  }

  getDocs() {
    return 
  }

  // EXPERIMENTAL: PositionShiftingService.positionShift() needs the new app just added in order to add it to the apps array so it can be shifted with the others.
  getNewAppId() {
    const newAppId = this.afdb.createPushId();
    return newAppId;
  }


  /* Called by PositionChangingService.addApp():  I am bypassing app adding service for expediency to get the new id I need for shifting the moved app with the rest of the apps */
  //private newAppId;

  // public observableAppId = Observable.create(
  //   observer => { observer.next(this.newAppId)/*; observer.complete()*/ });

  //public subject = new BehaviorSubject(null);

  addAppWithId(app: App) {
    const newAppId = this.afdb.createPushId();

    this.afdb.list('apps').set(newAppId, {
      position: app.position,
      title: app.title,
      appUrl: app.appUrl,
      description: app.description,
      imgUrl: app.imgUrl,
      gitHubUrl: app.gitHubUrl
    });
    return newAppId;
    
    // 2. this.subject.next(newAppId);
    // this.subject.next(newApp);
  }





	getApps() {
		return this.apps;
	}

	getKeys() {
		return this.keys;
  }
  
  addApp(app: App) {
    this.afdb.list('apps').push({
      position: app.position,
      title: app.title,
      appUrl: app.appUrl,
      description: app.description,
      imgUrl: app.imgUrl,
      gitHubUrl: app.gitHubUrl
    });
  }

  updateApp(app: App) {
    // console.log(app, 'updateApp');
    this.afdb.object('apps/' + app.id).update({
      //id: app.id,
      position: app.position,
      title: app.title,
      appUrl: app.appUrl,
      description: app.description,
      imgUrl: app.imgUrl,
      gitHubUrl: app.gitHubUrl
    });
  }

  deleteApp(app) {
    this.afdb.list('apps').remove(app.id);
  }
}