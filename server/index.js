'use strict';

require( 'babel-core/register' );

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 8080 });

server.route({
    method: 'GET',
    path: '/api',
    handler: function (request, reply) {
        reply({ 'api': 'Hello world!'});
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
