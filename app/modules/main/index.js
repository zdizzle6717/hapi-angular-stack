'use strict';

const moduleName = 'main';
const angular = require('angular');

let mod = angular.module(moduleName, [
    // Angular
    require('angular-animate'),
    require('angular-ui-router'),
    require('angular-sanitize'),
    require('angular-utils-pagination'),
    require('angular-scroll')
]);

// Run
mod.run(require('./run'));

// Config
mod.config(require('./config'));

// Constants
mod.constant('API_ROUTES', require('./constants/ApiRoutes'))

// Controllers
mod.controller('HomeController', require('./controllers/HomeController.js'));
mod.controller('MovieController', require('./controllers/MovieController.js'));
mod.controller('DirectorController', require('./controllers/DirectorController.js'));

// Directives
mod.directive('header', require('./directives/Header.js'));
mod.directive('footer', require('./directives/Footer.js'));
mod.directive('updateNotification', require('./directives/UpdateNotification.js'));
mod.directive('deleteRecordModal', require('./directives/DeleteRecordModal.js'));

// Services
mod.service('MovieService', require('./services/MovieService'));
mod.service('DirectorService', require('./services/DirectorService'))

module.exports = moduleName;
