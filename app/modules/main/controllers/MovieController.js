'use strict';

MovieController.$inject = ['MovieService', '$stateParams', '$state'];
function MovieController (MovieService, $stateParams, $state) {
    let controller = this;
    init();

    /////////////////////////////

    function init() {
        let currentState = $state.current.name;
        if ($stateParams.id) {
            if (currentState === 'viewMovie') {
                MovieService.get($stateParams.id)
                .then(function(response) {
                    controller.currentMovie = response.data;
                });
            }
            else if (currentState === 'editMovie') {
                MovieService.get($stateParams.id)
                .then(function(response) {
                    controller.currentMovie = response.data;
                });
            }
        }
    }


}

module.exports = MovieController;
