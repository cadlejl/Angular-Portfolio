import { Injectable } from "@angular/core";

import { AngularFireDatabase } from "angularfire2/database";

import { Observable } from "rxjs";
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

	getApps() {
		return this.apps;
	}

	getKeys() {
		return this.keys;
	}

}