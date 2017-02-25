"use strict";
angular.module('sprintGraphApp').controller('NotificationCtrl',
		[ 'NotificationService', '$timeout', 'rx',  function(notificationService,  $timeout, rx) {
			var vm = this;
			var alertVisibilityDuration = 3;// Second
			
			this.alert = null;
		
			notificationService.getAlert()//
			.flatMap(function(alert) {
				return rx.Observable.interval(alertVisibilityDuration * 1000)//
				.map(function(index) {
					return {
						alert : alert,
						action : "hide"
					}
				})//
				.startWith({
					alert : alert,
					action : "show"
				}).take(2)//

			}).subscribe(function(tuple) {
				$timeout(function() {
					if (tuple.action == "show") {
						vm.alert = tuple.alert;
					} else {
						if (vm.alert == tuple.alert) {
							vm.alert = null;
						}
					}

				});
			})

		} ]);