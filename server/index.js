'use strict';

require( 'babel-core/register' );

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 8080 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.start((err) => {
    console.log('started');

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
