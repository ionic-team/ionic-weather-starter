// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appId: '0dd2e08fd19801e6177193ba30a52199',
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  icons: {
    sunny: 'assets/images/sunny.png',
    cloudy: 'assets/images/cloudy.png',
    lightRain: 'assets/images/light-rain.png',
    shower: 'assets/images/shower.png',
    sunnyThunderStorm: 'assets/images/partial-tstorm.png',
    thunderStorm: 'assets/images/tstorm.png',
    fog: 'assets/images/fog.png',
    snow: 'assets/images/snow.png',
    unknown: 'assets/images/dunno.png',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
