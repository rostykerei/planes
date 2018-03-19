// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/',
  //apiUrl: 'https://radar-api.rostykerei.nl/',
  mapStartLat: 52.4892462,
  mapStartLon: 4.749578,
  mapStartZoom: 7,
  mapTypeId: 'terrain'
};
