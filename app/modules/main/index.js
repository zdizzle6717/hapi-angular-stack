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

// Controllers
mod.controller('HomeController', require('./controllers/HomeController.js'));

// Directives
mod.directive('header', require('./directives/Header.js'));
mod.directive('footer', require('./directives/Footer.js'));

module.exports = moduleName;
