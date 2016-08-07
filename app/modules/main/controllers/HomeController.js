'use strict';

HomeController.$inject = ['MovieService', '$stateParams', '$state'];
function HomeController (MovieService, $stateParams, $state) {
    let controller = this;

    controller.addNewMovie = addNewMovie;
    controller.addNewDirector = addNewDirector;
    controller.deleteMovie = deleteMovie;
    init();

    /////////////////////////////

    function init() {
        MovieService.getAll()
        .then(function(response) {
            controller.allMovies = response.data;
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
