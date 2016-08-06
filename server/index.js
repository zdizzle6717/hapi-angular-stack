'use strict';

require('babel-core/register');

const Hapi = require('hapi');
let models = require('./models');

// Create Server
const server = new Hapi.Server();
server.connection({
    port: 8080
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
