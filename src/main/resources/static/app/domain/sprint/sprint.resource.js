"use strict";
angular.module('sprintGraphApp').factory('SprintResource', [ '$resource', 'BASE_URL', function($resource, BASE_URL) {
	return $resource('http://' + BASE_URL + '/sprints/:sprintId/:subResource/:subResourceId', {}, {
		getStories : {
			params : {
				subResource : 'stories'
			},
			method : 'GET'
		},
		saveStory : {
			params : {
				subResource : 'stories'
			},
			headers :{'Content-Type':'text/uri-list'},
			method : 'POST'
		},
		removeStory : {
			params : {
				subResource : 'stories',
			},
			method : 'DELETE'
		},
		update:{
			method : 'PUT'
		}
	});
} ]);
