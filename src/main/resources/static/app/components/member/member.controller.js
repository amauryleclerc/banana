"use strict";
angular.module('sprintGraphApp').controller('MemberCtrl', [ 'MemberService' ,'$stateParams', '$timeout',function(memberService,$stateParams,$timeout) {
	var vm = this;
	this.member = {};
	function getMember() {
		memberService.get($stateParams.id).subscribe(function(member) {
			
			$timeout(function() {
				vm.member = member;
			})

		}, console.error);
	}
	getMember();
} ]);
