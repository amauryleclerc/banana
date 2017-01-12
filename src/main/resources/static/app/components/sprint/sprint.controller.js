"use strict";
angular.module('sprintGraphApp').controller('SprintCtrl',
		[ 'SprintService', 'StoryService', 'storyComplexities', '$timeout', '$uibModal', 'rx', '$stateParams', '$state', function(sprintService, storyService, storyComplexities, $timeout, $uibModal, rx, $stateParams,$state) {
			this.sprint ={};
			this.stories = [];
			this.editStoryId = null;
			this.storyComplexities = storyComplexities;
			var vm = this;
			
			function getStories() {
				sprintService.getStories(vm.sprint).subscribe(function(stories) {
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
			}
			function getSprint() {
				sprintService.get($stateParams.id).subscribe(function(sprint) {
					$timeout(function() {
						if (sprint.start) {
							sprint.start = new Date(sprint.start);
						}
						if (sprint.end) {
							sprint.end = new Date(sprint.end);
						}
						vm.sprint = sprint;
						getStories();
					})

				}, console.error);
			}
			getSprint();

			this.updateStory = function(story) {
				storyService.update(story).subscribe(console.log, console.error, function() {
					$timeout(function() {
						vm.editStoryId = null;
						getStories();
					})
				});
			}
			this.cancelUpdateStory = function(){
				vm.editStoryId = null;
				getStories();
			}
			this.removeStory = function(story) {
				return sprintService.removeStory(vm.sprint, story)//
				.subscribe(console.log, console.error, getStories)
			}

			this.dateOptions = {
				startingDay : 1
			};

			this.openNewStory = function() {
				var modalInstance = $uibModal.open({
					animation : true,
					ariaLabelledBy : 'modal-title',
					size : 'bg',
					ariaDescribedBy : 'modal-body',
					templateUrl : 'app/components/story/new-story.html',
					controller : 'NewStoryCtrl',
					controllerAs : 'newStoryCtrl',
					resolve : {
						sprint : function() {
							return vm.sprint;
						}
					}
				});
				rx.Observable.fromPromise(modalInstance.result)//
				.flatMap(function(story) {
					return sprintService.saveStory(vm.sprint, story);
				}).subscribe(console.log, console.error, getStories)

			}
			
			this.showStory = function(story){
				$state.go('story',{id:story.id});
			}
		} ]);
