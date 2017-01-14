"use strict";
angular.module('sprintGraphApp').controller('MembersCtrl',
		[ 'MemberService', '$timeout', '$uibModal', 'rx','$state', function(memberService ,$timeout, $uibModal, rx,$state) {
			this.members = [];
			this.editMemberId = null;
			var vm = this;
			function getMembers() {
				memberService.getAll().subscribe(function(members) {
					$timeout(function() {
						vm.members = members;
					})
				});
			}
			getMembers() 
	
		
			this.update = function(member) {
				memberService.update(member).subscribe(console.log, console.error, function() {
					$timeout(function() {
						vm.editMemberId = null;
						getMembers();
					})
				});
			}
			this.cancelUpdate = function(){
				vm.editMemberId = null;
				getMembers();
			}
			this.remove = function(member) {
				return memberService.remove(member).subscribe(console.log, console.error, getMembers)

			}

			this.dateOptions = {
				startingDay : 1
			};


			this.newMember = function() {
				var modalInstance = $uibModal.open({
					animation : true,
					ariaLabelledBy : 'modal-title',
					size : 'bg',
					ariaDescribedBy : 'modal-body',
					templateUrl : 'app/components/member/new-member.html',
					controller : 'NewMemberCtrl',
					controllerAs : 'newMemberCtrl',
					resolve : {
						sprint : function() {
							return null;
						}
					}
				});
				rx.Observable.fromPromise(modalInstance.result)//
				.flatMap(function(member) {
					return memberService.save(member);
				}).subscribe(console.log, console.error, getMembers)

			}
			this.showMember = function(member){
				$state.go('member',{id:member.id});
			}
		} ]);
