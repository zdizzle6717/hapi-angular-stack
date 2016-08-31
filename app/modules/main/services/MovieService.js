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
            data: data
        });
    };

    this.update = function(id, data) {
        return $http({
            method: 'PUT',
            url: API_ROUTES.movies.update + id,
            data: data
        });
    };

    this.delete = function(id) {
        return $http({
            method: 'DELETE',
            url: API_ROUTES.movies.delete + id
        });
    };

}

module.exports = MovieService;
