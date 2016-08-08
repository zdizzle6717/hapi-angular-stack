'use strict';

updateNotification.$inject = [];
function updateNotification() {
    return {
        name: 'updateNotification',
        template: require('./templates/updateNotification.html'),
        scope: true,
        transclude: true,
        link: function link(scope, elem, attrs, ctrl) {
            scope.show = false;
            let listener = scope.$on('show:notification', function() {
                scope.show = true;
            });

            scope.$on('$destroy', listener);
        }
    };
}

module.exports = updateNotification;
