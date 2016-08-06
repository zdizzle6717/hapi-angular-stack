'use strict';

let api = require('./api');
let models = require('../models');

module.exports = [
    // Base Route
    {
        method: 'GET',
        path: '/api',
        handler: function(req, res) {
            res({
                'api': 'Hello world!'
            });
        }
    },

    // Directors
    {
        method: 'GET',
        path: '/api/directors/{id}',
        handler: api.directors.get
    },
    {
        method: 'GET',
        path: '/api/directors',
        handler: api.directors.getAll
    },
    {
        method: 'POST',
        path: '/api/directors',
        handler: api.directors.create
    },
    {
        method: 'DELETE',
        path: '/api/directors/{id}',
        handler: api.directors.delete
    },
    {
        method: 'PUT',
        path: '/api/directors/{id}',
        handler: api.directors.update
    },

    // Movies
    {
        method: 'GET',
        path: '/api/movies/{id}',
        handler: api.movies.get
    },
    {
        method: 'GET',
        path: '/api/movies',
        handler: api.movies.getAll
    },
    {
        method: 'POST',
        path: '/api/movies',
        handler: api.movies.create
    },
    {
        method: 'DELETE',
        path: '/api/movies/{id}',
        handler: api.movies.delete
    },
    {
        method: 'PUT',
        path: '/api/movies/{id}',
        handler: api.movies.update
    },

];
