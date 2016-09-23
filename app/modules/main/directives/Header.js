'use strict';

header.$inject = ['$rootScope', '$state', 'AuthService', 'API_ROUTES'];
function header($rootScope, $state, AuthService, API_ROUTES) {
    return {
        name: 'header',
        template: require('./templates/header.html'),
        scope: true,
        link: function link(scope) {
            scope.toggled = false;
            scope.toggleNav = toggleNav;
			scope.logout = logout;
			scope.apiLink = API_ROUTES.documentation;

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
