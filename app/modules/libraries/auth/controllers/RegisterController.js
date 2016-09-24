'use strict';

RegisterController.$inject = ['$rootScope', '$state', 'AuthService'];

function RegisterController($rootScope, $state, AuthService) {
    let controller = this;

    controller.invalidUsername = false;
    controller.invalidEmail = false;

    controller.register = register;

	init();

    ////////////////////////////

	function init() {
		if (AuthService.isAuthenticated) {
			$state.go('dashboard');
		}
	}

    function register(credentials) {
        return AuthService.register(credentials)
            .then(function(response) {
                $state.go('dashboard');
            })
            .catch(function(response) {
				if (response.data.message === "Username taken") {
					controller.invalidUsername = true;
				    controller.invalidEmail = false;
				} else if (response.data.message === 'Email taken') {
					controller.invalidUsername = false;
				    controller.invalidEmail = true;
				}
				return response;
            });
    }
}

module.exports = RegisterController;
