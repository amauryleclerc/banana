"use strict";
angular.module('sprintGraphApp').factory('AbsenceResource', [ '$resource', 'BASE_URL', function($resource, BASE_URL) {
	return $resource(BASE_URL + '/absences/:id', {}, {
		update:{
			method : 'PUT'
		}
	});
} ]);
