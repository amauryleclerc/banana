"use strict";
angular.module('sprintGraphApp').factory('StorySearchResource', [ '$resource', 'BASE_URL', function($resource, BASE_URL) {
	return $resource( BASE_URL + '/stories/search/:searchMethod', {}, {
		search:{
		    method : 'GET'
		}
	});
} ]);