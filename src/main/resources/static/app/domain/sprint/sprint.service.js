"use strict";
angular.module('sprintGraphApp').factory('SprintService', [ 'SprintResource', 'rx', 'StoryService', function(sprintResource, rx, storyService, BASE_URL) {
	var saveSprint = function(sprint) {
		return rx.Observable.just(sprint).map(function(s) {
			s.stories = s.stories.map(function(story) {
				return "http://" + BASE_URL + "/api/story/" + story.id;
			});
			return s;
		}).flatMap(function(s) {
			return sprintResource.save(s).$promise;
		})
	}
	var saveStories = function(sprint) {
		return rx.Observable.just(sprint)//
		.flatMap(function(s) {
			return rx.Observable.from(s.stories)//
			.map(function(story) {
				if (story.addDate == null) {
					story.addDate = s.start;
				}
				return story;
			}).flatMap(function(story) {
				return storyService.save(story);
			})
		})
	}

	return {
		save : function(sprint) {
			return rx.Observable.concat(saveStories(sprint), saveSprint(sprint));
		},
		getAll : function() {
			return rx.Observable.fromPromise(sprintResource.get().$promise).map(function(result) {
				return result._embedded.sprints;
			});
		},
		saveStory : function(sprint, story) {
			return storyService.save(story)//
			.concatMap(function(response) {
				var uri = response._links.self.href;
				return rx.Observable.fromPromise(sprintResource.saveStory({
					sprintId : sprint.id
				},  uri ).$promise)
			})
		},
		getStories : function(sprint) {
			return rx.Observable.just(sprint).map(function(s) {
				return s.id;
			}).flatMap(function(id) {
				return rx.Observable.fromPromise(sprintResource.getStories({
					sprintId : id
				}).$promise)

			}).map(function(result) {
				return result._embedded.stories;
			});
		},
		removeStory: function(sprint, story){
				return rx.Observable.fromPromise(sprintResource.removeStory({
					sprintId : sprint.id,
					subResourceId:story.id
				}).$promise)
		},
		update:function(sprint){
			return rx.Observable.fromPromise(sprintResource.update({
				sprintId : sprint.id,
			},sprint).$promise)
		}
	};
} ]);