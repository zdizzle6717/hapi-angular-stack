'use strict';

MovieController.$inject = ['MovieService', 'DirectorService', '$stateParams', '$state', '$rootScope', '$timeout', '$filter'];
function MovieController (MovieService, DirectorService, $stateParams, $state, $rootScope, $timeout, $filter) {
    let controller = this;

    controller.allMovies = [];
    controller.toggled = false;
    controller.searchParams = '';
    controller.orderParams = '';

    controller.addMovie = addMovie;
    controller.updateMovie = updateMovie;
    controller.deleteMovie = deleteMovie;
    controller.toggleDirector = toggleDirector;
    controller.updatMovieList = controller.updateMovieList;

    init();

    /////////////////////////////

    function init() {
        let currentState = $state.current.name;

        if (currentState === 'viewMovie') {
            MovieService.get($stateParams.id)
            .then(function(response) {
                controller.currentMovie = response.data;
            })
            .then(function() {
                DirectorService.get(controller.currentMovie.DirectorId)
                .then(function(response) {
                    controller.currentDirector = response.data;
                    controller.currentDirector.fullName = controller.currentDirector.firstName + ' ' + controller.currentDirector.lastName;
                });
            });
        }
        else if (currentState === 'editMovie') {
            if ($stateParams.id) {
                MovieService.get($stateParams.id)
                .then(function(response) {
                    controller.currentMovie = response.data;
                    controller.movieUpdate = true;
                });
            }
            else {
                controller.newMovie = true;
                controller.currentMovie = {};
            }
            DirectorService.getAll()
            .then(function(response) {
                controller.allDirectors = response.data;
                controller.allDirectors.forEach(function(director) {
                    director.fullName = director.firstName + ' ' + director.lastName;
                });
            });

        }
        else {
            MovieService.getAll()
            .then(function(response) {
                controller.movies = response.data;
                DirectorService.getAll()
                .then(function(response) {
                    controller.directors = response.data;
                    controller.movies.forEach(function(movie) {
                        for (let i = 0, len = controller.directors.length; i < len; i++) {
                            if (movie.DirectorId === controller.directors[i].id) {
                                movie.director = controller.directors[i].firstName + ' ' + controller.directors[i].lastName;
                                controller.allMovies.push(movie);
                                controller.allMoviesFiltered = controller.allMovies;
                            }
                        }
                    });
                });
            });
        }
    }

    function addMovie(movieData, directorData) {
        if (directorData) {
            DirectorService.create(directorData)
            .then(function(response) {
                controller.currentDirector = response.data;
            })
            .then(function() {
                movieData.DirectorId = controller.currentDirector.id;
                MovieService.create(movieData)
                .then(function(response) {
                    $rootScope.$broadcast('show:notification');
                    $timeout(function() {
                        $state.go('allMovies');
                    }, 2000);
                });
            });
        }
        else {
            MovieService.create(movieData)
            .then(function(response) {
                $rootScope.$broadcast('show:notification');
                $timeout(function() {
                    $state.go('allMovies');
                }, 2000);
            });
        }
    }

    function updateMovie(id, movieData, directorData) {
        let movie = cleanData(movieData);
        let director = directorData ? cleanData(directorData) : undefined;
        if (director) {
            DirectorService.create(director)
            .then(function(response) {
                controller.currentDirector = response.data;
            })
            .then(function() {
                movie.DirectorId = controller.currentDirector.id;
                MovieService.update(id, movie)
                .then(function(response) {
                    controller.currentMovie = response.data;
                    $rootScope.$broadcast('show:notification');
                    $timeout(function() {
                        $state.go('allMovies');
                    }, 2000);
                });
            });
        }
        else {
            MovieService.update(id, movie)
            .then(function(response) {
                controller.currentMovie = response.data;
                $rootScope.$broadcast('show:notification');
                $timeout(function() {
                    $state.go('allMovies');
                }, 2000);
            });
        }
    }

    function deleteMovie(movie, index) {
        MovieService.delete(movie.id)
        .then(function(response) {
            controller.allMovies.splice(index, 1);
            console.log('You deleted movie id ' + movie.id);
        });
    }

    function toggleDirector() {
        controller.toggled = !controller.toggled;
        if (controller.currentMovie && controller.currentMovie.DirectorId) {
            controller.currentMovie.DirectorId = controller.toggled ? undefined : controller.currentMovie.DirectorId;
        }
    }


    function cleanData(obj) {
        let newData = angular.copy(obj);
        delete newData.id;
        delete newData.createdAt;
        delete newData.updatedAt;
        return newData;
    }

    controller.updateMovieList = function (searchParams, orderParams) {
      controller.allMoviesFiltered = $filter('orderBy')($filter('filter')(controller.allMovies, searchParams), orderParams);
    };

}

module.exports = MovieController;
