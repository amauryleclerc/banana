'use strict';

angular.module('sprintGraphApp', [ 'ngResource', 'ui.bootstrap', 'ui.router', 'rx', 'highcharts-ng', 'ngStomp', 'ngStorage', 'cfp.hotkeys', 'pascalprecht.translate' ]);

angular.module('sprintGraphApp').config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/graph");

	$stateProvider.state('graph', {
		url : "/graph",
		templateUrl : "app/components/graph/graph.html",
		controller : 'GraphCtrl',
		controllerAs : 'graphCtrl'
	}).state('sprints', {
		url : "/sprints",
		templateUrl : "app/components/sprint/sprints.html",
		controller : 'SprintsCtrl',
		controllerAs : 'sprintsCtrl'
	}).state('sprint', {
		url : "/sprint/:id",
		templateUrl : "app/components/sprint/sprint.html",
		controller : 'SprintCtrl',
		controllerAs : 'sprintCtrl'
	}).state('stories', {
		url : "/stories",
		templateUrl : "app/components/story/stories.html",
		controller : 'StoriesCtrl',
		controllerAs : 'storiesCtrl'
	}).state('story', {
		url : "/story/:id",
		templateUrl : "app/components/story/story.html",
		controller : 'StoryCtrl',
		controllerAs : 'storyCtrl'
	}).state('members', {
		url : "/members",
		templateUrl : "app/components/member/members.html",
		controller : 'MembersCtrl',
		controllerAs : 'membersCtrl'
	}).state('member', {
		url : "/member/:id",
		templateUrl : "app/components/member/member.html",
		controller : 'MemberCtrl',
		controllerAs : 'memberCtrl'
	}).state('settings', {
		url : "/settings",
		templateUrl : "app/components/settings/settings.html",
		controller : 'SettingsCtrl',
		controllerAs : 'settingsCtrl'
	}).state('plush', {
		url : "/plush",
		templateUrl : "app/components/plush/plush.html",
		controller : 'PlushCtrl',
		controllerAs : 'plushCtrl'
	});

});
angular.module('sprintGraphApp').config([ '$translateProvider', function($translateProvider) {
	$translateProvider.useSanitizeValueStrategy('escaped')//
	.useStaticFilesLoader({
		prefix : 'i18n/locale-',
		suffix : '.json'
	})//
	.registerAvailableLanguageKeys([ 'en', 'fr' ], {
		'en_*' : 'en',
		'fr_*' : 'fr',
		'*' : 'en'
	})//
	.determinePreferredLanguage()//
	.fallbackLanguage('en');
} ]);

angular.module('sprintGraphApp').factory("BASE_URL", [ "$location", function($location) {
	return "http://" + $location.host() + ":" + $location.port() + "/api";
} ]);
angular.module('sprintGraphApp').factory("BASE_URL_WS", [ "$location", function($location) {
	return "http://" + $location.host() + ":" + $location.port() + "/websocket";
} ]);
angular.module('sprintGraphApp').constant("storyComplexities", [ 0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100 ])
angular.module('sprintGraphApp').constant("storyTypes", [ "BUG_STORY", "TECHNICAL_STORY", "USER_STORY" ])