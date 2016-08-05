'use strict';

require('babel-polyfill');

const angular = require('angular');

const appName = 'Hapi Angular Stack';
const appVersion = '1.0.0';

let app = angular.module(appName, [
    require('./modules/main')
]);

// Constants
app.constant('appTitle', appName);

angular.bootstrap(document, [appName]);
