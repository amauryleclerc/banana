"use strict";
angular.module('sprintGraphApp').factory('ProjectResource', [ '$resource', 'BASE_URL', function($resource, BASE_URL) {
	return $resource('http://' + BASE_URL + '/project/:id', {}, {
		update:{
			method : 'PUT'
		}
	});
} ]);
