'use strict';

require('babel-core/register');

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
let models = require('./models');
let env = require('./config/envVariables')

// Create Server
const server = new Hapi.Server();
server.connection({
    port: env.port
});

const options = {
    info: {
        'title': 'Hapi Stack API Documentation',
        'version': '0.0.1',
    },
    basePath: '/api/',
    pathPrefixSize: 2,
    tags: [{
        'name': 'movies'
    }, {
        'name': 'directors'
    }],
};

// Register Swagger Plugin ( Use for documentation and testing purpose )
server.register([
        Inert,
        Vision, {
            register: HapiSwagger,
            options: options
        }
    ], {
        routes: {
            prefix: '/api'
        }
    },
    function(err) {
        if (err) {
            server.log(['error'], 'hapi-swagger load error: ' + err);
        } else {
            server.log(['start'], 'hapi-swagger interface loaded');
        }
    });

// Routes
server.route(require('./routes'));

models.sequelize.sync().then(function() {
    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});
