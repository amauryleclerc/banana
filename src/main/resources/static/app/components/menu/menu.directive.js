"use strict";
angular.module('sprintGraphApp').directive('menu',  function() {
	return {
	    controller: 'MenuCtrl',
	    controllerAs: 'menuCtrl',
	    templateUrl: '/app/components/menu/menu.html'
	  };

} );