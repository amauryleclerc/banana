"use strict";
angular.module('sprintGraphApp').controller('AdminCtrl', [ 'SprintService', 'StoryService', '$timeout', function(sprintService, storyService, $timeout) {
	this.stories = [];
	this.story = null;
	this.sprints = [];
	this.sprint = {
		stories : []
	};
	var vm = this;

	function getStories(){
		storyService.getAll().subscribe(function(resultat) {
			$timeout(function() {
				vm.stories = resultat._embedded.stories.filter(function(story) {
					return story.closeDate == null;
				});
				if (vm.stories.length > 0) {
					vm.story = vm.stories[0];
				}
			})

		});
	}
	getStories();

	this.save = function() {
		sprintService.save(this.sprint).subscribe(console.log, console.error);
	}
	this.updateStory = function(){
		storyService.save(vm.story).subscribe(function(result){
			console.log(result);
			getStories();
		}, console.error);
	}
	
	this.addStory = function() {
		vm.sprint.stories.push({});
	}

	this.dateOptions = {
		startingDay : 1
	};
	
	
	
	
} ]);
