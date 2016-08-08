'use strict';

header.$inject = ['$rootScope'];
function header($rootScope) {
    return {
        name: 'header',
        template: require('./templates/header.html'),
        scope: true,
        link: function link(scope) {
            scope.toggled = false;
            scope.toggleNav = toggleNav;

            $rootScope.$on('$stateChangeSuccess', function() {
                scope.toggled = false;
            });

            function toggleNav() {
                scope.toggled = !scope.toggled;
            }
        }
    };
}

module.exports = header;
