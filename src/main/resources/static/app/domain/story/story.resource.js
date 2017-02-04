"use strict";
angular.module('sprintGraphApp').factory('StoryResource', [ '$resource', 'BASE_URL', function($resource, BASE_URL) {
	return $resource( BASE_URL + '/stories/:id', {}, {
		update:{
			method : 'PUT'
		}
	});
} ]);