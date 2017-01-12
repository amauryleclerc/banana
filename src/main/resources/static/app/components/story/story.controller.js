"use strict";
angular.module('sprintGraphApp').controller('StoryCtrl', [ '$uibModalInstance', 'storyComplexities',  function($uibModalInstance, storyComplexities) {
	var vm = this;
	this.story = {
		complexity:0

	};
	this.storyComplexities = [];
	this.storyComplexities = storyComplexities;
	
	this.save = function() {
		$uibModalInstance.close(vm.story);
	};

	this.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
	this.dateOptions = {
		startingDay : 1
	};
} ]);
