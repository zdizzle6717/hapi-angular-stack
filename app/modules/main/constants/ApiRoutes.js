'use strict';

let routes = {
    'movies': {
        'get': 'http://www.demo.zackanselm.com:8080/api/movies/',
        'getAll': 'http://www.demo.zackanselm.com:8080/api/movies',
        'create': 'http://www.demo.zackanselm.com:8080/api/movies',
        'update': 'http://www.demo.zackanselm.com:8080/api/movies/',
        'delete': 'http://www.demo.zackanselm.com:8080/api/movies/'
    },

    'directors': {
        'get': 'http://www.demo.zackanselm.com:8080/api/directors/',
        'getAll': 'http://www.demo.zackanselm.com:8080/api/directors',
        'create': 'http://www.demo.zackanselm.com:8080/api/directors',
        'update': 'http://www.demo.zackanselm.com:8080/api/directors/',
        'delete': 'http://www.demo.zackanselm.com:8080/api/directors/'
    }
};

module.exports = routes;
