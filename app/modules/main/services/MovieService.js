'use strict';

MovieService.$inject = ['$http', 'API_ROUTES'];
function MovieService($http, API_ROUTES) {


    this.get = function(id) {
        return $http({
            method: 'GET',
            url: API_ROUTES.movies.get + id
        });
    };

    this.getAll = function() {
        return $http({
            method: 'GET',
            url: API_ROUTES.movies.getAll,
        });
    };

    this.create = function(data) {
        return $http({
            method: 'POST',
            url: API_ROUTES.movies.create,
            data: cleanData(data)
        });
    };

    this.update = function(id, data) {
        return $http({
            method: 'PUT',
            url: API_ROUTES.movies.update + id,
            data: cleanData(data)
        });
    };

    this.delete = function(id) {
        return $http({
            method: 'DELETE',
            url: API_ROUTES.movies.delete + id
        });
    };

	function cleanData(obj) {
        let newData = angular.copy(obj);
        delete newData.id;
        delete newData.createdAt;
        delete newData.updatedAt;
		delete newData.Director;
        return newData;
    }

}

module.exports = MovieService;
