"use strict";
angular.module('sprintGraphApp').factory('SprintService', ['$resource', 'BASE_URL', function ($resource, BASE_URL) {
	return $resource(`http://${BASE_URL}/sprints`);
}]);