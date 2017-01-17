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

    var dateObs = sprintObs.flatMap(function(sprint) {
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
                  		})//
                  		.toArray()
                  		.map(function(dates) {
                  		    return [ sprint, dates];
                  		})});

	var complexitySeriesObs = dateObs
	    .flatMap(function(sprintdate) {
	        var sprint = sprintdate[0];
	        return rx.Observable.from(sprintdate[1])
	        .map(function(date) {
                return [ date, getComplexity(date, sprint) ];
            })
            .toArray()});

	var complexityBonusSeriesObs = dateObs
	    .flatMap(function(sprintdate) {
	        var sprint = sprintdate[0];
	        return rx.Observable.from(sprintdate[1])
	        .map(function(date) {
                return [ date, getBonusComplexity(date, sprint) ];
            })
            .toArray()});

     var seriesObs = rx.Observable.zip(complexitySeriesObs, complexityBonusSeriesObs, function(complexity, bonuscomplexity){
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
                            data: bonuscomplexity,
                            id: '1',
                            name: 'Bonus',
                            type: 'line',
                            dashStyle: 'Solid',
                            lineWidth: 5,
                            color: '#e13730'
                         },
                         {
                            data : complexity,
                            color: '#0000FF',
                            id: '2',
                            name: 'Engagé',
                            type: 'line',
                            dashStyle: 'Solid',
                            lineWidth: 5,
                            color: '#41b2c7'
			}];
		}).shareReplay(1);

	var xAxisObs = sprintObs.map(function(sprint) {
		return {
			min : new Date(sprint.start).getTime(),
			max : new Date(sprint.end).getTime(),
			type : 'datetime'
		}
	}).shareReplay(1);

    var titleObs = sprintObs.map(function(sprint) {
        return {
            text : sprint.id
        }
    }).shareReplay(1);

     var subtitleObs = sprintObs.map(function(sprint) {
            return {
                text : 'Du ' + sprint.start + ' au ' + sprint.end
            }
     }).shareReplay(1);

	function setSprint(sprint) {
		sprintSubject.onNext(sprint);
	}

	function getComplexity(date, sprint) {
	console.log(sprint);
		return sprint.stories.filter(function(story) {
		console.log(sprint.start + ' vs ' + story.addDate)
			return (story.addDate > sprint.start && (story.closeDate == null || new Date(story.closeDate).getTime() > date));
		}).map(function(story) {
			return story.complexity;
		}).reduce(function(acc, complexity) {
			return acc + complexity;
		}, 0);
	}

	function getBonusComplexity(date, sprint) {
    		return sprint.stories.filter(function(story) {
    			return (story.addDate <= sprint.start && (story.closeDate == null || new Date(story.closeDate).getTime() > date));
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
		},
		getTitle : function() {
		    return titleObs;
		},
		getSubTitle : function() {
		    return subtitleObs;
		}
	};
} ]);