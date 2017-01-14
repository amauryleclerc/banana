"use strict";
angular.module('sprintGraphApp').factory('MemberResource', [ '$resource', 'BASE_URL', function($resource, BASE_URL) {
	return $resource('http://' + BASE_URL + '/members/:id', {}, {
		update:{
			method : 'PUT'
		}
	});
} ]);
