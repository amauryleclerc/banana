"use strict";
angular.module('sprintGraphApp').factory('SettingsResource', [ '$resource', 'BASE_URL', function($resource, BASE_URL) {
	return $resource('http://' + BASE_URL + '/settings', {}, {
		getStories : {
			method : 'GET'
		},
		saveStory : {
			method : 'POST'
		},
		removeStory : {
			method : 'DELETE'
		},
		update:{
			method : 'PUT'
		}
	});
} ]);
