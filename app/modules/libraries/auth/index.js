'use strict';

const moduleName = 'auth';
const angular = require('angular');

let mod = angular.module(moduleName, [
	// Angular
	require('angular-animate'),
	require('angular-ui-router'),
]);

// Run
mod.run(require('./run'));

// Controllers
mod.controller('LoginController', require('./controllers/LoginController'));

// Services
mod.service('AuthService', require('./services/AuthService'));

// Directives
mod.directive('accessLevel', require('./directives/accessLevel'));

module.exports = moduleName;
