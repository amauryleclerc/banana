"use strict";
angular.module('sprintGraphApp').factory('PlushService', [ '$stomp', '$timeout', 'NotificationService', 'BASE_URL_WS', function($stomp, $timeout,notificationService,BASE_URL_WS) {

	var service = {
		plushs : {}
	};
	$stomp.connect(BASE_URL_WS)//
	.then(function(frame) {
		var t = $stomp.subscribe('/plush/states', function(data, headers, res) {
			$timeout(function() {
				if(Object.keys(service.plushs).length != 0 && data.length >0){
					notificationService.setSuccess("updated",{item:data[0].plush.name})
				}
				data.forEach(function(state) {
					service.plushs[state.plush.id] = state;
				})
			
			})

		});
	});
	service.take = function(plush, memberName, memberId) {
		$stomp.send('/plush/take', {
			plush : plush,
			owner : {
				id : memberId,
				name : memberName
			}
		}, {})
	}
	service.release = function(plush,memberName, memberId) {
		$stomp.send('/plush/release', {
			plush : plush,
			owner : {
				id : memberId,
				name : memberName
			}
		}, {})
	}
	return service;
} ]);