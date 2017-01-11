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
		 options: {
                    chart: {
                        type: 'line',
                        backgroundColor: '#333333'
                    },
                    labels: {
                        style: {
                            color: '#ffffff',
                            fontSize: 18
                            }
                    },
                    legend: {
                        itemStyle: {
                            color: '#ffffff',
                            fontSize: 18
                        }
                    },
                    plotOptions: {
                      series: {
                          stacking: ''
                    },
                    yAxis: {
                        title: {
                            style: {
                                color: '#ffffff'
                            }
                        }
                    }
                }
          },
		series : [],
		title: {
            text: 'Sprint 28 de XXX',
            style: { 'color': '#ffffff' }
          },
          credits: {
            enabled: false
          },
          loading: false,
          size: {
            width: '1680',
            height: '960'
          },
          subtitle: {
            text: 'Du 9 Janvier 2017 au 27 Janvier 2017'
          }
	}

} ]);
