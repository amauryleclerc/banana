"use strict";
angular.module('sprintGraphApp').factory('StoryResource', ['$resource', 'BASE_URL', function ($resource, BASE_URL) {
	return $resource('http://'+BASE_URL+'/stories');
}]);