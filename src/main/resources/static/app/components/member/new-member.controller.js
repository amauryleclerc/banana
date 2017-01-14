"use strict";
angular.module('sprintGraphApp').controller('NewMemberCtrl', [ '$uibModalInstance',  function($uibModalInstance) {
	var vm = this;
	this.member = {
	};
	this.save = function() {
		$uibModalInstance.close(vm.member);
	};
	this.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
	this.dateOptions = {
		startingDay : 1
	};
} ]);
