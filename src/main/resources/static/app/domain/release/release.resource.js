"use strict";
angular.module('sprintGraphApp').factory('ReleaseResource', [ '$resource', 'BASE_URL', function($resource, BASE_URL) {
	return $resource( BASE_URL + '/releases/:releaseId', {}, {

	});
} ]);
