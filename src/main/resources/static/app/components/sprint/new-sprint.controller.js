"use strict";
angular.module('sprintGraphApp').controller('NewSprintCtrl', [ '$uibModalInstance', function($uibModalInstance) {
	var vm = this;
	this.sprint = {
		start : getDate(0),
		end : getDate(19),
		stories : []
	};


	function getDate(plusDay) {
		return new Date(new Date().getTime() + (60 * 60 * 24) * 1000 * plusDay);
	}

	this.save = function() {
		$uibModalInstance.close(vm.sprint);
	};

	this.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
	this.dateOptions = {
		startingDay : 1
	};
} ]);
