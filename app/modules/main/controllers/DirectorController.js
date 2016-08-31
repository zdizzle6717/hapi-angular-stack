'use strict';

DirectorController.$inject = ['DirectorService', '$stateParams', '$state', '$rootScope', '$timeout', '$filter'];
function DirectorController (DirectorService, $stateParams, $state, $rootScope, $timeout, $filter) {
    let controller = this;

    controller.searchParams = '';

    controller.updateDirectorList = updateDirectorList;
    controller.addDirector = addDirector;
    controller.updateDirector = updateDirector;
    controller.deleteDirector = deleteDirector;
    controller.showDeleteModal = showDeleteModal;
    controller.hideDeleteModal = hideDeleteModal;

    init();

    /////////////////////////////

    function init() {
        let currentState = $state.current.name;

        if (currentState === 'viewDirector') {
            DirectorService.get($stateParams.id)
            .then(function(response) {
                controller.currentDirector = response.data;
            });
        }
        else if (currentState === 'editDirector') {
            if ($stateParams.id) {
                DirectorService.get($stateParams.id)
                .then(function(response) {
                    controller.currentDirector = response.data;
                    controller.directorUpdate = true;
                });
            }
            else {
                controller.newDirector = true;
                controller.currentDirector = {};
            }
        }
        else {
            DirectorService.getAll()
            .then(function(response) {
                controller.allDirectors = response.data;
                controller.allDirectors.forEach(function(director) {
                    director.fullName = director.firstName + ' ' + director.lastName;
                });
                controller.allDirectorsFiltered = controller.allDirectors;
            });
        }
    }

    function addDirector(formData) {
        DirectorService.create(formData)
        .then(function(response) {
			showAlert({
				type: 'success',
				message: 'Director ' + controller.currentDirector.firstName + ' ' + controller.currentDirector.lastName + ' was successfully created.'
			});
            $timeout(function() {
                $state.go('allDirectors');
            }, 1500);
        });
    }

    function updateDirector(id, data) {
        DirectorService.update(id, data)
        .then(function(response) {
            controller.currentDirector = response.data;
			showAlert({
				type: 'success',
				message: 'Director ' + controller.currentDirector.firstName + ' ' + controller.currentDirector.lastName + ' was successfully updated.'
			});
            $timeout(function() {
                $state.go('allDirectors');
            }, 1500);
        });
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

    function deleteDirector(id, index) {
        DirectorService.delete(id)
        .then(function(response) {
            controller.allDirectors.splice(index, 1);
        });
    }

    function updateDirectorList(searchParams) {
        controller.allDirectorsFiltered = $filter('filter')(controller.allDirectors, searchParams);
    }

	function showAlert(config) {
		$rootScope.$broadcast('show:notification', {type: config.type, message: config.message});
	}

}

module.exports = DirectorController;
