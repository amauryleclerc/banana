"use strict";
angular.module('sprintGraphApp').controller('StoriesCtrl',
		[ 'StoryService', 'NotificationService', 'storyComplexities', 'storyTypes', '$timeout', '$uibModal', 'rx','$state', function(storyService, notificationService,storyComplexities,storyTypes, $timeout, $uibModal, rx,$state) {
			this.stories = [];
			this.editStoryId = null;
			this.storyComplexities = storyComplexities;
			this.storyTypes = storyTypes;
			this.example = { };
			var vm = this;
			function getStories() {
				storyService.getAll().subscribe(function(stories) {
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
			getStories()

            this.resetSearchStories = function() {
                vm.example.addDateStart = null;
                vm.example.addDateEnd = null;
                vm.example.closeDateStart = null;
                vm.example.closeDateEnd = null;
                getStories();
            }

	        this.searchStories = function() {

                if (vm.example.addDateStart && vm.example.addDateEnd == null) {
                    vm.example.addDateEnd = new Date();
                }
                if (vm.example.closeDateStart && vm.example.closeDateEnd == null) {
                    vm.example.closeDateEnd = new Date();
                }

                var searchMethod = null;
                if (vm.example.addDateStart != null && vm.example.addDateEnd != null && vm.example.closeDateStart != null && vm.example.closeDateEnd != null) {
                    searchMethod = "findByAddDateBetweenAndCloseDateBetween";
                }
                else if (vm.example.addDateStart != null && vm.example.addDateEnd != null) {
                    searchMethod = "findByAddDateBetween";
                }
                else if (vm.example.closeDateStart != null && vm.example.closeDateEnd != null) {
                    searchMethod = "findByCloseDateBetween";
                }

	            storyService.search(searchMethod, vm.example.addDateStart, vm.example.addDateEnd, vm.example.closeDateStart, vm.example.closeDateEnd).subscribe(function(stories) {
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
		
			this.update = function(story) {
				storyService.update(story).subscribe(console.log, console.error, function() {
					$timeout(function() {
						vm.editStoryId = null;
						getStories();
					})
				});
			}
			this.cancelUpdate = function(){
				vm.editStoryId = null;
				getStories();
			}
			this.remove = function(story) {
				return storyService.remove(story).subscribe(console.log, console.error, getStories)

			}

			this.dateOptions = {
				startingDay : 1
			};


			this.newStory = function() {
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
							return null;
						}
					}
				});
				rx.Observable.fromPromise(modalInstance.result)//
				.flatMap(function(story) {
					return storyService.save(story);
				}).subscribe(function(story){
					notificationService.setSuccess(story.name+" added");
				}, function(error){
					if(error != "cancel"){
						notificationService.setHttpError(error);
					}
					
				}, getStories)

			}
			this.showStory = function(story){
				$state.go('story',{id:story.id});
			}
		} ]);
