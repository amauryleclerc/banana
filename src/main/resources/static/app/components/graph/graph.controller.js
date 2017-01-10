"use strict";
angular.module('sprintGraphApp').controller('GraphCtrl', [ 'GraphService', 'SprintService', '$timeout', 'rx', '$localStorage', function(graphService, sprintService, $timeout, rx, $localStorage) {
	var vm = this;
	this.sprints = [];
	this.sprint = null;

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
				vm.onSprintChange();
			}

		})
	});
	graphService.getSeries().subscribe(function(series) {
		$timeout(function() {
			console.log(series);
			vm.chartConfig.series = series;
		})
	});
	graphService.getXAxis().subscribe(function(xAxis) {
		$timeout(function() {
			console.log(xAxis);
			vm.chartConfig.xAxis = xAxis;
		})
	});

	this.onSprintChange = function() {
		vm.chartConfig.title.text = vm.sprint.id;
		graphService.setSprint(vm.sprint);
		$localStorage.sprintId = vm.sprint.id;

	}

	this.chartConfig = {
		title : {
			text : "Burndown chart",
			x : -20
		// center
		},
		yAxis : {
			min : 0
		},
		series : []
	}

} ]);
