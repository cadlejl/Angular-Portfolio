import { Injectable } from "@angular/core";

import { AngularFireDatabase } from "angularfire2/database";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { App } from "../model/app";

@Injectable({ providedIn: 'root' })
export class AppService {
	private apps: Observable<any[]>;
	// private keys: Observable<any[]>;

	constructor(/*public in sticky notes*/private afdb: AngularFireDatabase) {
    this.apps = afdb.list('/apps/').valueChanges();
    

		// this.keys = afdb.list<App[]>('apps')
		// 	.snapshotChanges().pipe(
		// 		map(actions => actions.map(a => ({
		// 			key: a.key
		// 		})))
		// 	);
	}

	getApps() {
		return this.apps;
	}

	// getKeys() {
	// 	return this.keys;
  // }
  
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
    this.afdb.object('apps/' + app.id).update({
      id: app.id,
      position: app.position,
      title: app.title,
      appUrl: app.appUrl,
      description: app.description,
      imgUrl: app.imgUrl,
      gitHubUrl: app.gitHubUrl
    });
  }
}