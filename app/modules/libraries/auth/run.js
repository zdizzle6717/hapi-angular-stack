'use strict';

run.$inject = ['$rootScope', '$state', 'AuthService'];
function run($rootScope, $state, AuthService) {
	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams, options) {
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
