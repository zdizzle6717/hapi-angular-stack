'use strict';

AuthService.$inject = ['$q', '$http', 'API_ROUTES'];
function AuthService($q, $http, API_ROUTES) {
	let _user = JSON.parse(sessionStorage.getItem('currentUser')) || { username: '', password: '' };
	let _token = sessionStorage.getItem('id_token') || '';
	let _isAuthenticated = JSON.parse(sessionStorage.getItem('isAuthenticated')) || false;

	Object.defineProperties(this, {
		'currentUser': {
			'get': () => {
				return _user;
			}
		},
		'isAuthenticated': {
			'get': () => {
				return _isAuthenticated;
			}
		},
		'token': {
			'get': () => {
				return _token;
			}
		},
	});

	this.register = function(credentials) {
		// Post Login Credentials
		let args = {
			method: 'POST',
			url: API_ROUTES.users.register,
			data: {
				email: credentials.email,
				username: credentials.username,
				password: credentials.password
			}
		};

		return $http(args)
			.then(function(response) {
				$http.defaults.headers.common.Authorization = 'Bearer ' + response.data.id_token;
				_user = credentials;
				_user.admin = response.data.admin;
				_isAuthenticated = true;
				_token = response.data.id_token;
				sessionStorage.setItem('id_token', response.data.id_token);
				sessionStorage.setItem('currentUser', JSON.stringify(_user));
				sessionStorage.setItem('isAuthenticated', JSON.stringify(_isAuthenticated))
				return response;
			});
	};

	this.authenticate = function(credentials) {
		// Post Login Credentials
		let args = {
			method: 'POST',
			url: API_ROUTES.users.authenticate,
			data: {
				username: credentials.username,
				password: credentials.password
			}
		};

		return $http(args)
			.then(function(response) {
				$http.defaults.headers.common.Authorization = 'Bearer ' + response.data.id_token;
				_user = credentials;
				_user.admin = response.data.admin;
				_isAuthenticated = true;
				_token = response.data.id_token;
				sessionStorage.setItem('id_token', response.data.id_token);
				sessionStorage.setItem('currentUser', JSON.stringify(_user));
				sessionStorage.setItem('isAuthenticated', JSON.stringify(_isAuthenticated))
				return response;
			});
	};

	this.isAuthorized = function(accessLevel) {
		if (accessLevel[0] === 'public') {
			return true;
		} else if (_isAuthenticated) {
			let check = true;
			accessLevel.forEach(role => {
				if (_user[role] !== true) {
					check = false;
				}
			})
			return check;
		} else {
			return false;
		}
	};

	this.logout = function() {
		_user = {};
		_isAuthenticated = false;
		_token = '';
		sessionStorage.removeItem('currentUser');
		sessionStorage.removeItem('id_token');
		sessionStorage.removeItem('isAuthenticated');
	}

}

module.exports = AuthService;
