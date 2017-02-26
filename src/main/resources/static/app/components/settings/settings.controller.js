"use strict";
angular.module('sprintGraphApp').controller('SettingsCtrl', [ '$translate', function($translate) {
	var vm = this;
	this.changeLanguage = function(langKey) {
		$translate.use(langKey);
	};
} ]);
