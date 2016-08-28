'use strict';

let api = require('./api');
let Joi = require('joi');
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

	// File Upload
    {
        config: {
            payload: {
                output: 'stream',
                maxBytes: 209715200,
                parse: true,
                allow: 'multipart/form-data'
            },
            tags: ['api'],
            description: 'Upload a new file',
            notes: 'Upload a new file',
			cors: {
                origin: ['*']
            }
        },
		method: 'POST',
        path: '/api/files/{path}',
        handler: api.files.create
    },

    // Directors
    {
        config: {
            tags: ['api'],
            description: 'Get one director by id',
            notes: 'Get one director by id',
            validate: {
                params: {
                    id: Joi.number().required()
                }
            },
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
            tags: ['api'],
            description: 'Get all directors',
            notes: 'Get all directors',
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
            tags: ['api'],
            description: 'Add a new director',
            notes: 'Add a new director',
            validate: {
                payload: {
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    bio: Joi.string().required()
                }
            },
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
            tags: ['api'],
            description: 'Update a director by id',
            notes: 'Update a director by id',
            validate: {
                params: {
                    id: Joi.number().required()
                },
                payload: {
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    bio: Joi.string().required()
                }
            },
            cors: {
                origin: ['*']
            }
        },
        method: 'PUT',
        path: '/api/directors/{id}',
        handler: api.directors.update
    },
    {
        config: {
            tags: ['api'],
            description: 'Delete a director by id',
            notes: 'Delete a director by id',
            validate: {
                params: {
                    id: Joi.number().required()
                }
            },
            cors: {
                origin: ['*']
            }
        },
        method: 'DELETE',
        path: '/api/directors/{id}',
        handler: api.directors.delete
    },


    // Movies
    {
        config: {
            tags: ['api'],
            description: 'Get one movie by id',
            notes: 'Get one movie by id',
            validate: {
                params: {
                    id: Joi.number().required()
                }
            },
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
            tags: ['api'],
            description: 'Get all movies',
            notes: 'Get all movies',
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
            tags: ['api'],
            description: 'Add a new movie ',
            notes: 'Add a new movie',
            validate: {
                payload: {
                    title: Joi.string().required(),
                    year: Joi.number().required(),
                    genre: Joi.string(),
                    rating: Joi.number(),
                    coverImg: Joi.string(),
                    synopsis: Joi.string(),
                    description: Joi.string(),
                    DirectorId: Joi.number().required()
                }
            },
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
            tags: ['api'],
            description: 'Update a movie by id',
            notes: 'Update a movie by id',
            validate: {
                params: {
                    id: Joi.number().required()
                },
                payload: {
                    title: Joi.string().required(),
                    year: Joi.number().required(),
                    genre: Joi.string(),
                    rating: Joi.number(),
					coverImg: Joi.string(),
                    synopsis: Joi.string(),
                    description: Joi.string(),
                    DirectorId: Joi.number().required()
                }
            },
            cors: {
                origin: ['*']
            }
        },
        method: 'PUT',
        path: '/api/movies/{id}',
        handler: api.movies.update
    },
    {
        config: {
            tags: ['api'],
            description: 'Delete a movie by id',
            notes: 'Delete a movie by id',
            validate: {
                params: {
                    id: Joi.number().required()
                }
            },
            cors: {
                origin: ['*']
            }
        },
        method: 'DELETE',
        path: '/api/movies/{id}',
        handler: api.movies.delete
    },

];
