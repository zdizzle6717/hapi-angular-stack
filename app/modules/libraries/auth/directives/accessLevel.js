'use strict';

accessLevel.$inject = ['$compile', 'AuthService'];
function accessLevel($compile, AuthService) {
	return {
		name: 'accessLevel',
		restrict: 'A',
		replace: true,
		link: function(scope, elem, attrs) {
			let template = elem.html();
			let accessLevel = attrs.accessLevel ? attrs.accessLevel : '';

			checkAuthorization(accessLevel);

			//////////////////////////////////

			function checkAuthorization(accessLevel) {
				AuthService.isAuthorized(accessLevel)
					.then(function(response) {
						elem.html(template);
					})
					.catch(function() {
						elem.html('');
					})
					.finally(function() {
						$compile(elem.contents())(scope);
					});
			}
		}
	}
}

module.exports = accessLevel;
