"use strict";
angular.module('sprintGraphApp').controller('StoryCtrl', [ 'StoryService' ,'$stateParams', '$timeout',function(storyService,$stateParams,$timeout) {
	var vm = this;
	this.story = {};
	function getStory() {
		storyService.get($stateParams.id).subscribe(function(story) {
			
			$timeout(function() {
				console.log(story);
				vm.story = story;
			})

		}, console.error);
	}
	getStory();
} ]);
