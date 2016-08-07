'use strict';

HomeController.$inject = ['MovieService', '$stateParams', '$state'];
function HomeController (MovieService, $stateParams, $state) {
    let controller = this;

    controller.addNewMovie = addNewMovie;
    init();

    /////////////////////////////

    function init() {
        MovieService.getAll()
        .then(function(response) {
            controller.movies = response.data;
        });
    }

    function addNewMovie() {
        $state.go('editMovie');
    }


}

module.exports = HomeController;
