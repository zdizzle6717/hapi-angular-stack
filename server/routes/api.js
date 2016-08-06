'use strict';

let models = require('../models');

// Director Route Configs
let directors = {
    get: function(req, res) {
        models.Director.find({
                where: {
                    id: req.params.id
                }
            })
            .then(function(director) {
                res(director).code(200);
            });
    },
    getAll: function(req, res) {
        models.Director.findAll()
            .then(function(directors) {
                res(directors).code(200);
            });
    },
    create: function(req, res) {
        models.Director.create({
                firstName: req.payload.firstName,
                lastName: req.payload.lastName
            })
            .then(function(director) {
                res(director);
            });
    },
    update: function(req, res) {
        models.Director.find({
                where: {
                    id: req.params.id
                }
            })
            .then(function(director) {
                if (director) {
                    director.updateAttributes({
                        firstName: req.payload.firstName,
                        lastName: req.payload.lastName
                    }).then(function(director) {
                        res.send(director);
                    });
                }
            });
    },
    delete: function(req, res) {
        models.Director.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function(director) {
                res(director);
            });
    }
};


// Movie Route Configs
let movies = {
    get: function(req, res) {
        models.Movie.find({
                where: {
                    id: req.params.id
                }
            })
            .then(function(movie) {
                res(movie).code(200);
            });
    },
    getAll: function(req, res) {
        models.Movie.findAll()
            .then(function(movies) {
                res(movies).code(200);
            });
    },
    create: function(req, res) {
        models.Movie.create({
                title: req.payload.title,
                year: req.payload.year,
                director: req.payload.director,
                DirectorId: req.payload.DirectorId,
                genre: req.payload.genre,
                synopsis: req.payload.synopsis,
                rating: req.payload.rating
            })
            .then(function(movie) {
                res(movie);
            });
    },
    update: function(req, res) {
        models.Movie.find({
                where: {
                    id: req.params.id
                }
            })
            .then(function(movie) {
                if (movie) {
                    movie.updateAttributes({
                        title: req.payload.title,
                        year: req.payload.year,
                        director: req.payload.director,
                        DirectorId: req.payload.DirectorId,
                        genre: req.payload.genre,
                        synopsis: req.payload.synopsis,
                        rating: req.payload.rating
                    }).then(function(movie) {
                        res.send(movie);
                    });
                }
            });
    },
    delete: function(req, res) {
        models.Movie.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function(movie) {
                res(movie);
            });
    }
};


module.exports = {
    directors,
    movies
};
