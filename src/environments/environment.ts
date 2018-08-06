// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Initialize Firebase: referencing sticky-notes-fb app for guidance on this.
  firebase: {
    apiKey: "AIzaSyB6Yp8RxX3lwcflB828erXyQEPBN-jngvY",
    authDomain: "angular-portfolio-52830.firebaseapp.com",
    databaseURL: "https://angular-portfolio-52830.firebaseio.com",
    projectId: "angular-portfolio-52830",
    storageBucket: "angular-portfolio-52830.appspot.com",
    messagingSenderId: "525587659415"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
