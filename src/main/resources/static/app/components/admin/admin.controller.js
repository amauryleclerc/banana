"use strict";
angular.module('sprintGraphApp').controller('AdminCtrl', [ 'SprintService', 'StoryService', '$timeout', function(sprintService, storyService, $timeout) {
	this.stories = [];
	this.story = null;
	this.sprints = [];
	this.newSprint = {
		stories : []
	};
	this.selectedSprint = null;
	this.editStoryId = null;
	var vm = this;

	function getStories() {
		sprintService.getStories(vm.selectedSprint).subscribe(function(stories) {
			$timeout(function() {
				vm.stories = stories;
				if (vm.stories.length > 0 && vm.story == null) {
					vm.story = vm.stories[0];
				}
			})

		});
	}
	function getSprints() {
		sprintService.getAll().subscribe(function(sprints) {
			$timeout(function() {
				vm.sprints = sprints;
				if (vm.sprints.length > 0 && vm.selectedSprint == null) {
					vm.selectSprint(vm.sprints[0]);
				}
			})

		});
	}
	getSprints();

	this.selectSprint = function(sprint){
		vm.selectedSprint = sprint;
		vm.onSprintChange();
	}
	this.onSprintChange =function(){
		getStories();
	}
	
	this.save = function() {
		sprintService.save(vm.newSprint).subscribe(function(result) {
			getSprints();
		}, console.error);

	}
	this.updateStory = function() {
		storyService.save(vm.story).subscribe(function(result) {
			console.log(result);
			getStories();
		}, console.error);
	}
	this.removeStory = function(story){
		var index = vm.stories.indexOf(story);
		if (index > -1) {
			vm.stories.splice(index, 1);
		}
	}
	this.addStory = function() {
		vm.newSprint.stories.push({});
	}

	this.dateOptions = {
		startingDay : 1
	};

	this.saveStory = function(story) {
		vm.editStoryId = null;
		console.log("saveStory");
		console.log(story);

	}

} ]);
