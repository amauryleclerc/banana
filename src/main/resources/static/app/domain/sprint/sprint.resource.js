"use strict";
angular.module('sprintGraphApp').factory('SprintResource', [ '$resource', 'BASE_URL', function($resource, BASE_URL) {
	return $resource('http://' + BASE_URL + '/sprints/:sprintId/:subResource', {}, {
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
		}
	});
} ]);
