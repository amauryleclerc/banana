"use strict";
angular.module('sprintGraphApp').controller('NewStoryCtrl', [ '$uibModalInstance', 'storyComplexities', 'sprint', function($uibModalInstance, storyComplexities, sprint) {
	var vm = this;
	this.story = {
		complexity:0,
	};
	if(sprint != null){
		this.story.addDate = new Date(sprint.start)
	}
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
