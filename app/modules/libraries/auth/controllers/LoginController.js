'use strict';

LoginController.$inject = ['$rootScope', '$state', 'AuthService'];

function LoginController($rootScope, $state, AuthService) {
    let controller = this;

    controller.invalidCredentials = false;

    controller.login = login;

	init();

    ////////////////////////////

	function init() {
		login(AuthService.currentUser)
			.then(function(response) {
				console.log(response.statusCode + ': Already logged in.')
				$state.go('dashboard');
			})
			.catch(function() {
				angular.noop();
			});
	}

    function login(credentials) {
        return AuthService.authenticate(credentials)
            .then(function(response) {
                if (response) {
					console.log(response.statusCode + ': Authorized, login success.')
                    $state.go('dashboard');
                } else {
                    controller.invalidCredentials = true;
                }
            })
            .catch(function(response) {
                controller.invalidCredentials = true;
                console.log(response.statusCode + ': Unauthorized, invalid credentials');
				return response;
            });
    }
}

module.exports = LoginController;
