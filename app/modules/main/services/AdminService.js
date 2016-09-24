'use strict';

AdminService.$inject = ['$http', 'API_ROUTES'];
function AdminService($http, API_ROUTES) {
    let service = {};
    let routes = API_ROUTES;

    function getUsers() {
        let args = {
            method: 'GET',
            url: routes.users.getAll
        };

        return $http(args)
            .then((response) => {
                let users = response.data;
                return users;
            });
    }

	return {
		getUsers: getUsers
	}
}

module.exports = AdminService;
