"use strict";
angular.module('sprintGraphApp').factory('StoryService', ['StoryResource', 'rx', function (storyResource, rx) {
	return {save:function(story){
		return rx.Observable.just(story)//
		.flatMap(function(s) {
		    	return storyResource.save(s).$promise;
		    });
		
		
	}};
}]);