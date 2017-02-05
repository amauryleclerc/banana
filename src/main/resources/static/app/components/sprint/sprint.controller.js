"use strict";
angular.module('sprintGraphApp').controller(
		'SprintCtrl',
		[ 'SprintService', 'StoryService', 'MenuService', 'storyComplexities', 'storyTypes', '$timeout', '$uibModal', 'rx', '$stateParams', '$state',
				function(sprintService, storyService, menuService, storyComplexities, storyTypes, $timeout, $uibModal, rx, $stateParams, $state) {
					this.sprint = {};
					this.stories = [];
					this.editStoryId = null;
					this.storyComplexities = storyComplexities;
					this.storyTypes = storyTypes;
					this.members = [];
					this.dates = [];
					this.capacity = 0;
					this.nbDays = 0;
					this.velocity = 0.95;
					this.complexity = 0;
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
								vm.complexity = stories.reduce(function(acc, value) {
									return acc + value.complexity;
								}, 0);
							})
						}, console.error);
					}
					function getMembers() {
						vm.members = [];
						sprintService.getPresence(vm.sprint)//
						.concatMap(function(member) {
							return rx.Observable.from(member.presences)//
							.concatMap(function(presence) {
								return rx.Observable.from([ {
									isPresent : presence.isPresentOnMoring,
								}, {
									isPresent : presence.isPresentOnAfernoon,
								} ]);

							})//
							.toArray()//
							.map(function(presences){
								return{
									member:member.member,
									presences:presences
								}
							})
						}).subscribe(function(member) {
							console.log(member);
							vm.members.push(member);
							$timeout(function() {

							})
						}, console.error, getCapacity);
					}
					function getCapacity() {
						rx.Observable.from(vm.members)//
						.flatMap(function(member) {
							return rx.Observable.from(member.presences);
						}).filter(function(presence) {
							return presence.isPresent;
						}).count()//
						.subscribe(function(nbDays) {
							$timeout(function() {
								vm.nbDays = nbDays/2;
								vm.capacity = Math.round(nbDays/2 * vm.velocity);
							})
						}, console.error);
					}
					function getDates() {
						var start = vm.sprint.start;
						var end = vm.sprint.end;
						var diff = daydiff(start, end);
						return rx.Observable.range(0, diff).map(function(index) {
							return new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
						}).toArray()//
						.subscribe(function(dates) {
							$timeout(function() {
								vm.dates = dates;
							});
						}, console.error);
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
								getMembers();
								getDates();
							})

						}, console.error);
					}
					getSprint();
					function daydiff(first, second) {
						return Math.round((second - first) / (1000 * 60 * 60 * 24));
					}
					this.updateStory = function(story) {
						storyService.update(story).subscribe(console.log, console.error, function() {
							$timeout(function() {
								vm.editStoryId = null;
								getStories();
							})
						});
					}
					this.cancelUpdateStory = function() {
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
						}).subscribe(function(story) {
							console.log(story);
							menuService.setSuccess(story.name + " added");
						}, function(error) {
							menuService.setHttpError(error);
						}, getStories)

					}
					this.showMember = function(member) {
						$state.go('member', {
							id : member.id
						});
					}

					this.showStory = function(story) {
						$state.go('story', {
							id : story.id
						});
					}
				} ]);
