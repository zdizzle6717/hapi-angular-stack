'use strict';

DirectorController.$inject = ['DirectorService', '$stateParams', '$state'];
function DirectorController (DirectorService, $stateParams, $state) {
    let controller = this;
    init();

    /////////////////////////////

    function init() {
        let currentState = $state.current.name;
        if ($stateParams.id) {
            if (currentState === 'viewDirector') {
                DirectorService.get($stateParams.id)
                .then(function(response) {
                    controller.currentDirector = response.data;
                });
            }
            else if (currentState === 'editDirector') {
                DirectorService.get($stateParams.id)
                .then(function(response) {
                    controller.currentDirector = response.data;
                });
            }
        }
    }


}

module.exports = DirectorController;
