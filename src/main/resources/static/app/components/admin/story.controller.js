"use strict";
angular.module('sprintGraphApp').controller('StoryCtrl', [ '$uibModalInstance', 'storyComplexities', 'sprint', function($uibModalInstance, storyComplexities, sprint) {
	var vm = this;
	this.story = {
		complexity:0,
		addDate : new Date(sprint.start)

	};
	this.sprint = sprint;
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
