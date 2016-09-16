'use strict';

run.$inject = ['$rootScope', '$state', 'AuthService'];
function run($rootScope, $state, AuthService) {
	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams, options) {
		let authIsRequired = (toState.data && toState.data.accessLevel) ? true : false;
		let accessGranted = false;

		if (authIsRequired) {
			console.log('Auth Example 1: Run Phase');
			let accessLevel = toState.data.accessLevel;
			AuthService.isAuthorized(accessLevel)
				.then(function(response) {
					console.log(response.statusCode + ': Access granted.');
				})
				.catch(function(response) {
					console.log(response.statusCode + ': Not authorized.');
					e.preventDefault();
					$state.go('login', {reload: true});
				});
		}

	});
}

module.exports = run;
