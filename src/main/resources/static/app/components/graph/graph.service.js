"use strict";
angular.module('sprintGraphApp').factory('GraphService', [ 'SprintService', 'rx', function(sprintService, rx) {
	var sprintSubject = new rx.BehaviorSubject(null);

	var sprintObs = sprintSubject.asObservable()//
	.filter(function(sprint) {
		return sprint != null && (typeof sprint != 'undefined');
	}).shareReplay(1);

	var storiesObs = sprintObs.switchMap(function(sprint) {
		return sprintService.getStories(sprint);
	})

	var seriesObs = sprintObs.flatMap(function(sprint) {
		return storiesObs.first().map(function(stories) {
			sprint.stories = stories;
			return sprint;
		})
	}).switchMap(function(sprint) {
		return rx.Observable.range(0, daydiff(new Date(sprint.start), new Date(sprint.end)))//
		.map(function(index) {
			return new Date(sprint.start).getTime() + (index * 1000 * 60 * 60 * 24);
		}).filter(function(date) {
			return date <= Date.now();
		}).map(function(date) {
			return [ date, getComplexity(date, sprint.stories) ];
		})//
		.toArray()//
		.map(function(list) {
			return [ {
				name : 'Commited',
				type : "line",
				data : list,
				color: '#0000FF'
			}, {
			    name : 'Bonus',
				type : "line",
			    data : list,
			    color: '#FF0000'
			}, {
                name : 'Ideal',
				type : "line",
               	data : [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0],
               	color: '#00FF00'
            }];
		})
	}).shareReplay(1);

	var xAxisObs = sprintObs.map(function(sprint) {
		return {
			min : new Date(sprint.start).getTime(),
			max : new Date(sprint.end).getTime(),
			type : 'datetime'
		}
	}).shareReplay(1);

	function setSprint(sprint) {
		sprintSubject.onNext(sprint);
	}

	function getComplexity(date, stories) {
		return stories.filter(function(story) {
			return (story.closeDate == null || new Date(story.closeDate).getTime() > date);
		}).map(function(story) {
			return story.complexity;
		}).reduce(function(acc, complexity) {
			return acc + complexity;
		}, 0);
	}

	function daydiff(first, second) {
		return Math.round((second - first) / (1000 * 60 * 60 * 24));
	}

	return {
		setSprint : setSprint,
		getStrint : function() {
			return sprintObs;
		},
		getSeries : function() {
			return seriesObs;
		},
		getXAxis : function() {
			return xAxisObs;
		}
	};
} ]);