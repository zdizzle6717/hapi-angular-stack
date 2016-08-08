'use strict';

HomeController.$inject = ['MovieService', 'DirectorService', '$stateParams', '$state'];
function HomeController (MovieService, DirectorService, $stateParams, $state) {
    let controller = this;

    controller.allMovies = [];
    controller.addNewMovie = addNewMovie;
    controller.addNewDirector = addNewDirector;
    controller.deleteMovie = deleteMovie;
    init();

    /////////////////////////////

    function init() {
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
                        }
                    }
                });
            });
        });
    }

    function addNewMovie() {
        $state.go('editMovie');
    }

    function addNewDirector() {
        $state.go('editDirector');
    }

    function deleteMovie(movie, index) {
        MovieService.delete(movie.id)
        .then(function(response) {
            controller.allMovies.splice(index, 1);
            console.log('You deleted movie id ' + movie.id);
        });
    }

}

module.exports = HomeController;
