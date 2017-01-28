"use strict";
angular.module('sprintGraphApp').factory('GraphService', [ 'SprintService', 'MenuService', 'rx', function(sprintService,menuService, rx) {

	var sprintObs = menuService.getSelectedSprint()//
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
                                    		})//
                                    		.toArray()
                                    		.map(function(dates) {
                                    		    return [ sprint, dates];
                                    		})});

    var dateUntilNowObs = sprintObs.flatMap(function(sprint) {
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

	var complexitySeriesObs = dateUntilNowObs
	    .flatMap(function(sprintdate) {
	        var sprint = sprintdate[0];
	        return rx.Observable.from(sprintdate[1])
	        .map(function(date) {
                return [ date, getComplexity(date, sprint) ];
            })
            .toArray()});

	var complexityBonusSeriesObs = dateUntilNowObs
	    .flatMap(function(sprintdate) {
	        var sprint = sprintdate[0];
	        return rx.Observable.from(sprintdate[1])
	        .map(function(date) {
                return [ date, getBonusComplexity(date, sprint) ];
            })
            .toArray()});

	var idealSeriesObs = dateObs
	    .flatMap(function(sprintdate) {
	        var sprint = sprintdate[0];
	        return rx.Observable.from(sprintdate[1])
	        .map(function(date) {
                return [ date, getIdealComplexity(date, sprint) ];
            })
            .toArray()});


     var seriesObs = rx.Observable.zip(complexitySeriesObs, complexityBonusSeriesObs, idealSeriesObs, function(complexity, bonuscomplexity, ideal){
			return [  {
                            name: 'Idéal',
                            data: ideal,
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
            text : sprint.name
        }
    }).shareReplay(1);

     var subtitleObs = sprintObs.map(function(sprint) {
            return {
                text : 'Du ' + moment(new Date(sprint.start)).format('Do MMM YYYY')+ ' au ' + moment(new Date(sprint.end)).format('Do MMM YYYY')
            }
     }).shareReplay(1);


	function getComplexity(date, sprint) {
		return sprint.stories.filter(function(story) {
			return isCommitedStory(story, sprint) && isStoryClosed(story, date);
		}).map(function(story) {
			return story.complexity;
		}).reduce(function(acc, complexity) {
			return acc + complexity;
		}, 0);
	}

	function getBonusComplexity(date, sprint) {
        return sprint.stories.filter(function(story) {
            return isStoryClosed(story, date);
        }).map(function(story) {
            return story.complexity;
        }).reduce(function(acc, complexity) {
            return acc + complexity;
        }, 0);
    }

    function getIdealComplexity(date, sprint) {
        var total = totalCommitedComplexity(sprint);
        var days = daydiff(new Date(sprint.start).getTime(), new Date(sprint.end).getTime()) - 1;
        var complexityPerDay = total / days;
        return total - complexityPerDay * daydiff(new Date(sprint.start).getTime(), date);
    }

    function totalCommitedComplexity(sprint) {
     return sprint.stories.filter(function(story) {
            return isCommitedStory(story, sprint);
        }).map(function(story) {
            return story.complexity;
        }).reduce(function(acc, complexity) {
            return acc + complexity;
        }, 0);
    }

    function isStoryOpen(story, date) {
        return story.closeDate == null;
    }

	function isCommitedStory(story, sprint) {
	    var storyAddedTime = new Date(story.addDate).getTime();
	    var sprintStartDate = new Date(sprint.start).getTime();
	    return daydiff(storyAddedTime, sprintStartDate) >= 0;
	}

	function isBonusStory(story, sprint) {
	    var storyAddedTime = new Date(story.addDate).getTime();
	    var sprintStartDate = new Date(sprint.start).getTime();
	    return daydiff(sprintStartDate, storyAddedTime) > 0;
	}

	function isStoryClosed(story, date) {
	    return story.closeDate != null && daydiff(new Date(story.closeDate).getTime(), date) < 0;
	}

	function daydiff(first, second) {
		return Math.round((second - first) / (1000 * 60 * 60 * 24));
	}

	return {
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