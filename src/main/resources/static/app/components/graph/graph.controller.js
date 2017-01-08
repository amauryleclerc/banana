"use strict";
angular.module('sprintGraphApp').controller('GraphCtrl', [ 'GraphService', 'SprintService', '$timeout', 'rx', function(graphService, sprintService, $timeout, rx) {
	var vm = this;
	this.sprints = [];
	this.sprint = null;


	sprintService.getAll().subscribe(function(resultat) {
		$timeout(function() {
			vm.sprints = resultat._embedded.sprints;
			if (vm.sprints.length > 0) {
				vm.sprint = resultat._embedded.sprints[0];
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
		
	}


	this.chartConfig = {
		title : {
			text : "",
			x : -20
		// center
		},
		yAxis : {
			min : 0
		},
		series : []
	}

} ]);
