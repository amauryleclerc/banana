"use strict";
angular.module('sprintGraphApp').controller('GraphCtrl', [ 'SprintService', '$timeout', 'rx', function(sprintService, $timeout, rx) {
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

	this.onSprintChange = function() {
		vm.chartConfig.title.text = vm.sprint.id;
		sprintService.getStories(vm.sprint).subscribe(function(resultat) {
			$timeout(function() {
				updateChart(resultat._embedded.stories);
			});
		});
	}
	function updateChart(stories) {

		vm.chartConfig.xAxis.min = new Date(vm.sprint.start).getTime();
		vm.chartConfig.xAxis.max = new Date(vm.sprint.end).getTime();

		rx.Observable.range(0, daydiff(new Date(vm.sprint.start), new Date(vm.sprint.end)))//
		.map(function(index) {
			return  new Date(vm.sprint.start).getTime() + (index * 1000 * 60 * 60 * 24);
		})//
		.filter(function(date){
			return date<=Date.now();
		})//
		.map(function(date) {
			return [ date, getComplexity(date,stories) ];
		})//
		.toArray()//
		.map(function(list) {
			return [ {
				name : 'Complexity',
				data : list
			} ];
		}).subscribe(function(series) {
			$timeout(function() {
				vm.chartConfig.series = series;
			});
		}, console.error);

	}
	function getComplexity(date, stories) {
		return stories.filter(function(story) {
			return (story.closeDate == null || new Date(story.closeDate).getTime() > date );
		}).map(function(story) {
			return story.complexity;
		}).reduce(function(acc, complexity) {
			return acc + complexity;
		},0);

	}

	function daydiff(first, second) {
		return Math.round((second - first) / (1000 * 60 * 60 * 24));
	}

	this.chartConfig = {
		title : {
			text : "",
			x : -20
		// center
		},
		xAxis : {
			type : 'datetime'
		},
		yAxis : {
			min : 0
		},
		series : []
	}

} ]);
