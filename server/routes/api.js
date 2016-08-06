'use strict';

let models = require('../models');

let directors = {
  all: function(request, reply) {
    models.Director.findAll()
      .then(function(directors) {
        reply(directors).code(200);
      });
  }
};

let movies = {
  all: function(request, reply) {
    models.Movie.findAll()
      .then(function(movies) {
        reply(movies).code(200);
      });
  }
};


module.exports = { directors, movies };
