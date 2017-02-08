"use strict";
angular.module('sprintGraphApp').controller('GraphCtrl', [ 'GraphService', 'SprintService', '$timeout', 'rx', '$localStorage', function(graphService, sprintService, $timeout, rx, $localStorage) {
	var vm = this;

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
	graphService.getTitle().subscribe(function(title) {
		$timeout(function() {
			console.log(title);
			vm.chartConfig.title = title;
		})
	});

	graphService.getSubTitle().subscribe(function(subtitle) {
		$timeout(function() {
			console.log(subtitle);
			vm.chartConfig.subtitle = subtitle;
		})
	});

	this.chartConfig = {
		
		options : {
			chart : {
				type : 'line',
				backgroundColor : '#333333'
			},

			labels : {
				style : {
					color : '#000000',
					fontSize : 18
				}
			},
			legend : {
				itemStyle : {
					color : '#000000',
					fontSize : 18
				}
			},
			plotOptions : {
				series : {
					stacking : ''
				},
				yAxis : {
					title : {
						style : {
							color : '#000000'
						}
					}
				}
			}
		},
		series : [],
		title : {
			floating : true
		},
		credits : {
			enabled : false
		},
		loading : false,
		subtitle : {
			floating : true
		},
		chart : {}
	}
} ]);
