"use strict";
angular.module('sprintGraphApp').directive('notification',  function() {
	return {
	    controller: 'NotificationCtrl',
	    controllerAs: 'notificationCtrl',
	    templateUrl: '/app/components/notification/notification.html'
	  };

} );