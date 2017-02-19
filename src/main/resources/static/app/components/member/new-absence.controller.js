"use strict";
angular.module('sprintGraphApp').controller('NewAbsenceCtrl', [ '$uibModalInstance', 'MenuService','member',  function($uibModalInstance,menuService, member) {
	var vm = this;
	this.isValid = true;
	this.absence = {
			member:member,
			startAfternoon:false,
			endAfternoon:false,
			start:getDate(0),
			end:getDate(0)
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
	this.onDateChange = function(){
		var first = vm.absence.start.getTime();
		var second = vm.absence.end.getTime();
		vm.isValid = daydiff(first, second)>=0;
		if(!vm.isValid){
			menuService.setError("Start date need to be before end date");
		}
	}
	function daydiff(first, second) {
		return Math.round((second - first) / (1000 * 60 * 60 * 24));
	}
} ]);
