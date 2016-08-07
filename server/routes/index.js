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
        config: {
            cors: {
                origin: ['*']
            }
        },
        method: 'GET',
        path: '/api/directors/{id}',
        handler: api.directors.get
    },
    {
        config: {
            cors: {
                origin: ['*']
            }
        },
        method: 'GET',
        path: '/api/directors',
        handler: api.directors.getAll
    },
    {
        config: {
            cors: {
                origin: ['*']
            }
        },
        method: 'POST',
        path: '/api/directors',
        handler: api.directors.create
    },
    {
        config: {
            cors: {
                origin: ['*']
            }
        },
        method: 'DELETE',
        path: '/api/directors/{id}',
        handler: api.directors.delete
    },
    {
        config: {
            cors: {
                origin: ['*']
            }
        },
        method: 'PUT',
        path: '/api/directors/{id}',
        handler: api.directors.update
    },

    // Movies
    {
        config: {
            cors: {
                origin: ['*']
            }
        },
        method: 'GET',
        path: '/api/movies/{id}',
        handler: api.movies.get
    },
    {
        config: {
            cors: {
                origin: ['*']
            }
        },
        method: 'GET',
        path: '/api/movies',
        handler: api.movies.getAll
    },
    {
        config: {
            cors: {
                origin: ['*']
            }
        },
        method: 'POST',
        path: '/api/movies',
        handler: api.movies.create
    },
    {
        config: {
            cors: {
                origin: ['*']
            }
        },
        method: 'DELETE',
        path: '/api/movies/{id}',
        handler: api.movies.delete
    },
    {
        config: {
            cors: {
                origin: ['*']
            }
        },
        method: 'PUT',
        path: '/api/movies/{id}',
        handler: api.movies.update
    },

];
