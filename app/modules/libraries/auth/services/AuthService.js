'use strict';

AuthService.$inject = ['$q', '$http'];
function AuthService($q, $http) {
	let _user = {};

	Object.defineProperties(this, {
		'currentUser': {
			'get': () => {
				return _user;
			},
			'set': (user) => {
				Object.assign(_user, user);
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

}

module.exports = AuthService;
