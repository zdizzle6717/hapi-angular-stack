'use strict';

MovieController.$inject = ['MovieService', 'DirectorService', '$stateParams', '$state', '$rootScope', '$timeout', '$filter'];
function MovieController (MovieService, DirectorService, $stateParams, $state, $rootScope, $timeout, $filter) {
    let controller = this;

    controller.toggled = false;
    controller.searchParams = '';
    controller.orderParams = '-updatedAt';

    controller.addMovie = addMovie;
    controller.updateMovie = updateMovie;
    controller.deleteMovie = deleteMovie;
    controller.hideDeleteModal = hideDeleteModal;
    controller.showDeleteModal = showDeleteModal;
    controller.toggleDirector = toggleDirector;
    controller.getStars = getStars;
    controller.updatMovieList = controller.updateMovieList;

    init();

    /////////////////////////////

    function init() {
        let currentState = $state.current.name;

        if (currentState === 'viewMovie') {
            MovieService.get($stateParams.id)
            .then(function(response) {
                controller.currentMovie = response.data;
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
                controller.allMovies = response.data;
				controller.allMoviesFiltered = controller.allMovies;
            });
        }
    }

    function addMovie(movie, director) {
        if (director) {
            DirectorService.create(director)
            .then(function(response) {
                controller.currentDirector = response.data;
            })
            .then(function() {
                movie.DirectorId = controller.currentDirector.id;
                MovieService.create(movie)
                .then(function(response) {
					showAlert({
						type: 'success',
						message: 'New movie, ' + response.data.title + ' was successfully updated.'
					});
                    $timeout(function() {
                        $state.go('allMovies');
                    }, 2000);
                })
				.catch(function(response) {
					showAlert({
						type: 'error',
						message: 'Oops, something went wrong. Please contact the site administrator.'
					});
				});
            });
        }
        else {
            MovieService.create(movie)
            .then(function(response) {
				showAlert({
					type: 'success',
					message: 'New movie, ' + response.data.title + ' was successfully created.'
				});
                $timeout(function() {
                    $state.go('allMovies');
                }, 2000);
            })
			.catch(function(response) {
				showAlert({
					type: 'error',
					message: 'Oops, something went wrong. Please contact the site administrator.'
				});
			});
        }
    }

    function updateMovie(id, movie, director) {
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
					showAlert({
						type: 'success',
						message: controller.currentMovie.title + ' was successfully updated.'
					});
                    $timeout(function() {
                        $state.go('allMovies');
                    }, 2000);
                })
				.catch(function(response) {
					showAlert({
						type: 'error',
						message: 'Oops, something went wrong. Please contact the site administrator.'
					});
				});
            });
        }
        else {
            MovieService.update(id, movie)
            .then(function(response) {
                controller.currentMovie = response.data;
				showAlert({
					type: 'success',
					message: controller.currentMovie.title + ' was successfully updated.'
				});
                $timeout(function() {
                    $state.go('allMovies');
                }, 2000);
            })
			.catch(function(response) {
				showAlert({
					type: 'error',
					message: 'Oops, something went wrong. Please contact the site administrator.'
				});
			});
        }
    }

    function showDeleteModal(id, index, identifier) {
        $rootScope.$broadcast('show:modal', {
            id: id,
            index: index,
            identifier: identifier,
            toggle: true
        });
    }

    function hideDeleteModal() {
        $rootScope.$broadcast('show:modal', { toggle: false });
    }

    function deleteMovie(id, index) {
        MovieService.delete(id)
        .then(function(response) {
            controller.allMovies.splice(index, 1);
        });
    }

    function toggleDirector() {
        controller.toggled = !controller.toggled;
        if (controller.currentMovie && controller.currentMovie.DirectorId) {
            controller.currentMovie.DirectorId = controller.toggled ? undefined : controller.currentMovie.DirectorId;
        }
        controller.currentDirector = !controller.toggled ? undefined : controller.currentMovie.DirectorId;
    }

    function getStars(num) {
        if (num) {
            return new Array(num);
        }
    }

    controller.updateMovieList = function (searchParams, orderParams) {
      controller.allMoviesFiltered = $filter('orderBy')($filter('filter')(controller.allMovies, searchParams), orderParams);
    };

	function showAlert(config) {
		$rootScope.$broadcast('show:notification', {type: config.type, message: config.message});
	}

}

module.exports = MovieController;
