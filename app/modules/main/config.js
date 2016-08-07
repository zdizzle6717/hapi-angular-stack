'use strict';

config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];
function config($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.useApplyAsync(true);
    $httpProvider.defaults.cache = false;
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.useXDomain = true;

    $stateProvider
        .state({
            name: 'home',
            url: '/',
            controller: 'HomeController as Home',
            template: require('./views/home.html')
        })

        // Movies
        .state({
            name: 'viewMovie',
            url: '/movie/{id}',
            controller: 'MovieController as Movie',
            template: require('./views/viewMovie.html')
        })
        .state({
            name: 'editMovie',
            url: '/movie/edit/{id}',
            controller: 'MovieController as Movie',
            template: require('./views/editMovie.html')
        })
        .state({
            name: 'allMovies',
            url: '/movies',
            controller: 'MovieController as Movies',
            template: require('./views/allMovies.html')
        })

        // Directors
        .state({
            name: 'viewDirector',
            url: '/director/{id}',
            controller: 'DirectorController as Director',
            template: require('./views/viewDirector.html')
        })
        .state({
            name: 'editDirector',
            url: '/director/edit/{id}',
            controller: 'DirectorController as Director',
            template: require('./views/editDirector.html')
        })
        .state({
            name: 'allDirectors',
            url: '/directors',
            controller: 'DirectorController as Directors',
            template: require('./views/allDirectors.html')
        });

    $urlRouterProvider.otherwise('/');
}

module.exports = config;
