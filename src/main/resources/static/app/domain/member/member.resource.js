"use strict";
angular.module('sprintGraphApp').factory('MemberResource', [ '$resource', 'BASE_URL', function($resource, BASE_URL) {
	return $resource( BASE_URL + '/members/:id/:subResource/:subResourceId', {}, {
		update:{
			method : 'PUT'
		},
		getAbsences : {
			params : {
				subResource : 'absences'
			},
			method : 'GET'
		},
		saveAbsence :{
			params : {
				subResource : 'absences'
			},
			headers :{'Content-Type':'text/uri-list'},
			method : 'POST'
		}
	});
} ]);
