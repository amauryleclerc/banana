"use strict";
angular.module('sprintGraphApp').factory('StoryService', [ 'StoryResource', 'rx', function(storyResource, rx) {
	return {
		save : function(story) {
			return rx.Observable.just(story)//
			.flatMap(function(s) {
				return storyResource.save(s).$promise;
			});

		},
		getAll : function() {
			return rx.Observable.fromPromise(storyResource.get().$promise).map(function(result) {
				return result._embedded.stories;
			});;
		}, 
		update:function(story){
			return rx.Observable.fromPromise(storyResource.update({
				id : story.id,
			},story).$promise)
		},
		remove:function(story){
			return rx.Observable.fromPromise(storyResource.remove({
				id : story.id,
			}).$promise)
		}
	};
} ]);