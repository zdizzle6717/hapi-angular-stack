'use strict';

let routes = {
    'movies': {
        'get': 'http://www.demo.zackanselm.com:3000/api/movies/',
        'getAll': 'http://www.demo.zackanselm.com:3000/api/movies',
        'create': 'http://www.demo.zackanselm.com:3000/api/movies',
        'update': 'http://www.demo.zackanselm.com:3000/api/movies/',
        'delete': 'http://www.demo.zackanselm.com:3000/api/movies/'
    },

    'directors': {
        'get': 'http://www.demo.zackanselm.com:3000/api/directors/',
        'getAll': 'http://www.demo.zackanselm.com:3000/api/directors',
        'create': 'http://www.demo.zackanselm.com:3000/api/directors',
        'update': 'http://www.demo.zackanselm.com:3000/api/directors/',
        'delete': 'http://www.demo.zackanselm.com:3000/api/directors/'
    },

	'files': {
		'create': 'http://www.demo.zackanselm.com:3000/api/files/',
	}
};

module.exports = routes;
