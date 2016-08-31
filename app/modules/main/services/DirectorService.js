'use strict';

DirectorService.$inject = ['$http', 'API_ROUTES'];
function DirectorService($http, API_ROUTES) {


    this.get = function(id) {
        return $http({
            method: 'GET',
            url: API_ROUTES.directors.get + id
        });
    };

    this.getAll = function() {
        return $http({
            method: 'GET',
            url: API_ROUTES.directors.getAll,
        });
    };

    this.create = function(data) {
        return $http({
            method: 'POST',
            url: API_ROUTES.directors.create,
            data: cleanData(data)
        });
    };

    this.update = function(id, data) {
        return $http({
            method: 'PUT',
            url: API_ROUTES.directors.update + id,
            data: cleanData(data)
        });
    };

    this.delete = function(id) {
        return $http({
            method: 'DELETE',
            url: API_ROUTES.directors.delete + id
        });
    };

	function cleanData(obj) {
        let newData = angular.copy(obj);
        delete newData.id;
        delete newData.createdAt;
        delete newData.updatedAt;
		delete newData.Movies;
        return newData;
    }

}

module.exports = DirectorService;
