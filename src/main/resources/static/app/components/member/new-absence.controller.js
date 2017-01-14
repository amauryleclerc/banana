"use strict";
angular.module('sprintGraphApp').controller('NewAbsenceCtrl', [ '$uibModalInstance', 'member',  function($uibModalInstance, member) {
	var vm = this;
	this.absence = {
			member:member,
			startAfternoon:false,
			endAfternoon:false,
			start:getDate(0),
			end:getDate(1)
	}
	
	this.save = function() {
		$uibModalInstance.close(vm.absence);

	};

	this.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
	this.dateOptions = {
		startingDay : 1
	};
	function getDate(plusDay) {
		return new Date(new Date().getTime() + (60 * 60 * 24) * 1000 * plusDay);
	}

} ]);
