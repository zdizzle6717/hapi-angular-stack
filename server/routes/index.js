'use strict';

let api = require('./api');

module.exports = [
    {
        method: 'GET',
        path: '/api/directors',
        handler: api.directors.all
    },
    {
        method: 'GET',
        path: '/api/movies',
        handler: api.movies.all
    },
    {
        method: 'GET',
        path: '/api',
        handler: function(request, reply) {
            reply({
                'api': 'Hello world!'
            });
        }
    }
];
