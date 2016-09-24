'use strict';

accessLevel.$inject = ['$compile', 'AuthService', '$parse'];
function accessLevel($compile, AuthService, $parse) {
	return {
		name: 'accessLevel',
		restrict: 'A',
		replace: true,
		link: function(scope, elem, attrs) {
			let template = elem.html();
			let accessLevel = attrs.accessLevel ? $parse(attrs.accessLevel)(scope) : '';

			checkAuthorization(accessLevel);

			//////////////////////////////////

			function checkAuthorization(accessLevel) {
				if (AuthService.isAuthorized(accessLevel)) {
					elem.html(template);
				} else {
					elem.html('');
				}

				$compile(elem.contents())(scope);
			}
		}
	}
}

module.exports = accessLevel;
