'use strict';

run.$inject = ['$rootScope', '$state', 'AuthService', '$http'];
function run($rootScope, $state, AuthService, $http) {
	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams, options) {
		$http.defaults.headers.common.Authorization = AuthService.token ? 'Bearer ' + AuthService.token : '';
		let authIsRequired = (toState.data && toState.data.accessLevel) ? true : false;
		let accessLevel = (toState.data && toState.data.accessLevel) ? toState.data.accessLevel : 'public';
		let accessGranted = false;
		const checkAuth = checkAuth;


		if (authIsRequired) {
			if (AuthService.isAuthorized(accessLevel)) {
				console.log('Authorized.')
				return;
			} else if (!AuthService.isAuthenticated) {
				e.preventDefault();
				AuthService.authenticate(AuthService.currentUser)
					.then(function(response) {
						if (AuthService.isAuthorized(accessLevel)) {
							$state.go(toState.name);
						} else {
							$state.go('home');
						}
					})
					.catch(function(response) {
						console.log(response.status + ": Unauthenticated, please log in");
						$state.go('login', {reload: true});
					});
			}
		}

	});
}

module.exports = run;
