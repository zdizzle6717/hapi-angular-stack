'use strict';

DashboardController.$inject = ['AdminService'];
function DashboardController(AdminService) {
	let controller = this;

	AdminService.getUsers()
		.then(function(response) {
			controller.users = response;
		});
};

module.exports = DashboardController;
