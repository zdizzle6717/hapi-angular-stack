'use strict';

AuthService.$inject = ['$q', '$http'];
function AuthService($q, $http) {
	let _user = {};
	let _isAuthenticated = false;

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
		}
	});

	this.authenticate = function(credentials) {
		// Post Login Credentials
		let args = {
			method: 'GET',
			//method: 'POST' ...in a real app this should be a post
			url: 'data/mockUsers.json'
		};

		return $http(args)
			.then(function(response) {
				// Mock server auth check
				let deferred = $q.defer();
				let granted = false;
				let users = response.data;
				users.forEach(function(user) {
					if (user.username === credentials.username && user.password === credentials.password) {
						granted = true;
					}
					if (granted) {
						_user = response.data[0];
						_isAuthenticated = true;
						deferred.resolve({statusCode: '400'});
					} else {
						deferred.reject({statusCode: '401'});
					}
				});

				return deferred.promise;
			});
	};

	this.isAuthorized = function(accessLevel) {
		let deferred = $q.defer();
		if (_user.accessLevel === accessLevel) {
			deferred.resolve({statusCode: '400'});
		} else {
			deferred.reject({statusCode: '403'});
		}

		return deferred.promise;
	};

	this.logout = function() {
		_user = {};
		_isAuthenticated = false;
	}

}

module.exports = AuthService;
