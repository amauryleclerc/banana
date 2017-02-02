"use strict";
angular.module('sprintGraphApp').controller('MenuCtrl', [ 'MenuService', 'SprintService','$timeout', 'rx', '$localStorage', function(menuService, sprintService,  $timeout, rx, $localStorage) {
	var vm = this;
	var alertVisibilityDuration = 3;//Second
	this.sprintSelectable = true;
	
	this.sprints = [];
	this.sprint = null;
	this.alert = null;

	function getSprints(){
		sprintService.getAll().subscribe(function(resultat) {

			$timeout(function() {
				
				vm.sprints = resultat;
				if (vm.sprints.length > 0) {
					if ($localStorage.sprintId) {
						var sprintsFind = resultat.filter(function(s) {
							return s.id === $localStorage.sprintId;
						});
						if (sprintsFind.length > 0) {
							vm.sprint = sprintsFind[0];
						}
					}
					if (vm.sprint == null) {
						vm.sprint = resultat[0];
					}
				}
				vm.onSprintChange();
			})
		});
	}
	getSprints();
	
	menuService.getState().subscribe(function(resultat) {
		$timeout(function() {
			if(resultat.name === "graph"){
				getSprints();
				vm.sprintSelectable = true;
			}else{
				vm.sprintSelectable = false;
			}
		})
	});
	menuService.getAlert()//
		.flatMap(function(alert){
			return rx.Observable.interval(alertVisibilityDuration*1000)//
			.map(function(index){
				return {alert:alert,
						action: "hide"
						}
			})//
			.startWith({alert:alert,
				action:"show"})
			.take(2)//

		}).subscribe(function(tuple){
		$timeout(function() {
			if(tuple.action == "show"){
				vm.alert = tuple.alert;
			}else{
				if(vm.alert == tuple.alert){
					vm.alert = null;
				}
			}

		});
	})
	
	
	
	this.onSprintChange = function() {
		menuService.setSelectedSprint(vm.sprint);
		$localStorage.sprintId= vm.sprint.id;
	}
} ]);