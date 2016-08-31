'use strict';

HomeController.$inject = ['MovieService', 'DirectorService', '$stateParams', '$state'];
function HomeController (MovieService, DirectorService, $stateParams, $state) {
    let controller = this;

    controller.addNewMovie = addNewMovie;
    controller.addNewDirector = addNewDirector;
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

}

module.exports = HomeController;
