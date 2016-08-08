'use strict';

DirectorController.$inject = ['DirectorService', '$stateParams', '$state', '$rootScope', '$timeout', '$filter'];
function DirectorController (DirectorService, $stateParams, $state, $rootScope, $timeout, $filter) {
    let controller = this;

    controller.searchParams = '';

    controller.updateDirectorList = updateDirectorList;
    controller.addDirector = addDirector;
    controller.updateDirector = updateDirector;
    controller.deleteDirector = deleteDirector;

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
                controller.allDirectorsFiltered = controller.allDirectors;
            });
        }
    }

    function addDirector(formData) {
        DirectorService.create(formData)
        .then(function(response) {
            $rootScope.$broadcast('show:notification');
            $timeout(function() {
                $state.go('allDirectors');
            }, 2000);
        });
    }

    function updateDirector(id, formData) {
        let data = cleanData(formData);
        DirectorService.update(id, data)
        .then(function(response) {
            controller.currentDirector = response.data;
            $rootScope.$broadcast('show:notification');
            $timeout(function() {
                $state.go('allDirectors');
            }, 2000);
        });
    }

    function deleteDirector(director, index) {
        DirectorService.delete(director.id)
        .then(function(response) {
            controller.allDirectors.splice(index, 1);
            console.log('You deleted director id ' + director.id);
        });
    }

    function cleanData(obj) {
        let newData = angular.copy(obj);
        delete newData.id;
        delete newData.createdAt;
        delete newData.updatedAt;
        return newData;
    }

    function updateDirectorList(searchParams) {
        controller.allDirectorsFiltered = $filter('filter')(controller.allDirectors, searchParams);
    }

}

module.exports = DirectorController;
