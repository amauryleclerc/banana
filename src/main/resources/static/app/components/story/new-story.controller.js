"use strict";
angular.module('sprintGraphApp').controller('NewStoryCtrl',
		[ '$uibModalInstance', 'storyComplexities', 'storyTypes', 'StoryService', '$timeout','rx', 'sprint', function($uibModalInstance, storyComplexities, storyTypes, storyService, $timeout,rx, sprint) {
			var vm = this;
			this.story = {
				complexity : 0,
				businessValue : 0,
				type : "USER_STORY"
			};
			this.showExistingStories = false;
			this.existingStoriesAvailable = false;
			this.onlyBacklogStories = true;
			this.stories = [];
			if (sprint != null) {
				this.story.addDate = new Date(sprint.start)
				storyService.getAll()//				
				.flatMap(function(stories){
					return rx.Observable.from(stories);
				}).filter(function(story){
					return (sprint.stories.filter(function(s){
						return s.id == story.id;
					}).length === 0);
				}).toArray()//
				.subscribe(function(stories) {
					$timeout(function() {
						vm.stories = stories.map(function(story) {
							if (story.addDate) {
								story.addDate = new Date(story.addDate);
							}
							if (story.closeDate) {
								story.closeDate = new Date(story.closeDate);
							}
							return story;
						});

					})

				});
				this.existingStoriesAvailable = true;
				this.showExistingStories = true;
			}

			this.storyComplexities = storyComplexities;
			this.storyTypes = storyTypes;

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
