'use strict';

updateNotification.$inject = ['$timeout'];
function updateNotification($timeout) {
    return {
        name: 'updateNotification',
        template: require('./templates/updateNotification.html'),
        scope: true,
		link: function link(scope, elem, attrs, ctrl) {
            scope.show = false;
            let listener = scope.$on('show:notification', function(event, config) {
                scope.message = config.message;
                if (config.type === 'error') {
                    scope.type = 'error';
                } else if (config.type === 'success') {
                    scope.type = 'success';
                }
                scope.show = true;
                $timeout(() => {
                    scope.show = false;
                }, 2000);
            });

            scope.$on('$destroy', listener);
        }
    };
}

module.exports = updateNotification;
