"use strict";
angular.module('sprintGraphApp').controller('StoryCtrl', [ '$uibModalInstance', function($uibModalInstance) {
	var vm = this;
	this.story = {};
	
	this.save = function() {
		$uibModalInstance.close(vm.story);
	};

	this.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};

} ]);
