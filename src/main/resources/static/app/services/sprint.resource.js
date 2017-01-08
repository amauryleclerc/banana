"use strict";
angular.module('sprintGraphApp').factory('SprintResource', [ '$resource', 'BASE_URL', function($resource, BASE_URL) {
	return $resource('http://' + BASE_URL + '/sprints/:id/:subResource', {}, {
		getStories : {
			params : {
				subResource : 'stories'
			},
			method : 'GET'
		}
	});
} ]);
