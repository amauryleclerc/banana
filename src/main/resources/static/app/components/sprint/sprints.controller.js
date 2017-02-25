"use strict";
angular.module('sprintGraphApp').controller('SprintsCtrl',
		[ 'SprintService', 'NotificationService','$timeout', '$uibModal', 'rx', '$state', function(sprintService, notificationService, $timeout, $uibModal, rx, $state) {
			this.sprints = [];
			this.editSprintId = null;
			var vm = this;
			function getSprints() {
				sprintService.getAll().subscribe(function(sprints) {
					$timeout(function() {
						vm.sprints = sprints.map(function(sprint) {
							if (sprint.start) {
								sprint.start = new Date(sprint.start);
							}
							if (sprint.end) {
								sprint.end = new Date(sprint.end);
							}
							return sprint;
						});
					})
				});
			}
			getSprints();
			this.update = function(sprint){
				sprintService.update(sprint).subscribe(console.log, console.error, function() {
					$timeout(function() {
						vm.editSprintId = null;
						getSprints();
					})
				});
			}
			this.remove = function(sprint){
				return sprintService.remove(sprint).subscribe(console.log, console.error, getSprints)
			}
			this.dateOptions = {
				startingDay : 1
			};
			this.cancelUpdate = function(){
				vm.editSprintId = null;
				getSprints();
			}
			this.newSprint = function() {
				var modalInstance = $uibModal.open({
					animation : true,
					ariaLabelledBy : 'modal-title',
					size : 'bg',
					ariaDescribedBy : 'modal-body',
					templateUrl : 'app/components/sprint/new-sprint.html',
					controller : 'NewSprintCtrl',
					controllerAs : 'newSprintCtrl'
	
				});
				rx.Observable.fromPromise(modalInstance.result)//
				.flatMap(function(sprint) {
					return sprintService.save(sprint);
				}).subscribe(function(sprint){
					notificationService.setSuccess(sprint.name+" added");
				}, function(error){
					if(error != "cancel"){
						notificationService.setHttpError(error);
					}
				}, getSprints)

			}

			this.showSprint= function(sprint){
				$state.go('sprint',{id:sprint.id});
			}
			
			
		} ]);
