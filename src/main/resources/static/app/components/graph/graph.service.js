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
			return [  {
                            name: 'Idéal',
                            data: [113,105,97,89,81,73,65,57,48,40,32,24,16,8,0],
                            id: '0',
                            type: 'line',
                            connectNulls: false,
                            dashStyle: 'Dot',
                            lineWidth: 5,
                            color: '#000000',
                            dataLabels: {
                               style : {
                                   color: '#000000'
                               }
                            }
                         },
                         {
                            data: list,
                            id: '1',
                            name: 'Bonus',
                            type: 'line',
                            dashStyle: 'Solid',
                            lineWidth: 5,
                            color: '#e13730'
                         },
                         {
                            data : list,
                            color: '#0000FF',
                            id: '2',
                            name: 'Engagé',
                            type: 'line',
                            dashStyle: 'Solid',
                            lineWidth: 5,
                            color: '#41b2c7'
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