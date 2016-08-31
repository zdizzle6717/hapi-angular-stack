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
            data: data
        });
    };

    this.update = function(id, data) {
        return $http({
            method: 'PUT',
            url: API_ROUTES.directors.update + id,
            data: data
        });
    };

    this.delete = function(id) {
        return $http({
            method: 'DELETE',
            url: API_ROUTES.directors.delete + id
        });
    };

}

module.exports = DirectorService;
