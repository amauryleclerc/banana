"use strict";
angular.module('sprintGraphApp').factory('StoryService', ['$resource', 'BASE_URL', function ($resource, BASE_URL) {
	return $resource(`http://${BASE_URL}/storys`);
}]);