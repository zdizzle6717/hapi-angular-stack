'use strict';

config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];
function config($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.useApplyAsync(true);

    $stateProvider
        .state({
            name: 'home',
            url: '/',
            controller: 'HomeController as Home',
            template: require('./views/home.html')
        });

    $urlRouterProvider.otherwise('/');
}

module.exports = config;
