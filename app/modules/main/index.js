'use strict';

const moduleName = 'main';
const angular = require('angular');

let mod = angular.module(moduleName, [
    // Angular
    require('angular-animate'),
    require('angular-ui-router'),
    require('angular-sanitize'),
    require('angular-utils-pagination'),
    require('angular-scroll'),
	require('ng-file-upload'),

	// Libraries
	require('../libraries/auth')
]);

// Run
mod.run(require('./run'));

// Config
mod.config(require('./config'));

// Constants
mod.constant('API_ROUTES', require('./constants/ApiRoutes'));

// Controllers
mod.controller('HomeController', require('./controllers/HomeController.js'));
mod.controller('DashboardController', require('./controllers/DashboardController.js'));
mod.controller('MovieController', require('./controllers/MovieController.js'));
mod.controller('DirectorController', require('./controllers/DirectorController.js'));

// Directives
mod.directive('header', require('./directives/Header.js'));
mod.directive('footer', require('./directives/Footer.js'));
mod.directive('updateNotification', require('./directives/UpdateNotification.js'));
mod.directive('deleteRecordModal', require('./directives/DeleteRecordModal.js'));
mod.directive('fileUpload', require('./directives/FileUpload.js'));

// Services
mod.service('FileService', require('./services/FileService'));
mod.service('MovieService', require('./services/MovieService'));
mod.service('DirectorService', require('./services/DirectorService'))
mod.service('AdminService', require('./services/AdminService'))

module.exports = moduleName;
