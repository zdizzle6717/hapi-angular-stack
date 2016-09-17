'use strict';

header.$inject = ['$rootScope', '$state', 'AuthService'];
function header($rootScope, $state, AuthService) {
    return {
        name: 'header',
        template: require('./templates/header.html'),
        scope: true,
        link: function link(scope) {
            scope.toggled = false;
            scope.toggleNav = toggleNav;
			scope.logout = logout;

            $rootScope.$on('$stateChangeSuccess', function() {
                scope.toggled = false;
				scope.isAuthenticated = AuthService.isAuthenticated;
            });

            function toggleNav() {
                scope.toggled = !scope.toggled;
            }

			function logout() {
				AuthService.logout();
				$state.go('home', {}, {reload: true});
			}
        }
    };
}

module.exports = header;
