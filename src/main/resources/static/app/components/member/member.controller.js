"use strict";
angular.module('sprintGraphApp').controller('MemberCtrl',
		[ 'MemberService', '$stateParams', '$timeout', '$uibModal', 'rx', 'AbsenceService', function(memberService, $stateParams, $timeout, $uibModal, rx, absenceService) {
			var vm = this;
			this.member = {};
			this.absences = [];
			this.days =[];
			this.presences = [];
			this.editAbsenceId = null;

			function getMember() {
				memberService.get($stateParams.id).subscribe(function(member) {

					$timeout(function() {
						vm.member = member;
						getAbsences(member);
					})

				}, console.error);
			}
			getMember();

			function getAbsences(member) {
				vm.presences = [];
				vm.days =[];
				memberService.getPresencesInCurrentMonth(member)//
				.doOnNext(function(presence){
					$timeout(function() {
						vm.days.push(presence);
					});
				})
				.concatMap(function(presence){
					return rx.Observable.from([{
						isPresent:presence.isPresentOnMoring,
					},{
						isPresent:presence.isPresentOnAfernoon,
					}]);
					
				})//
				.subscribe(function(presence) {
					$timeout(function() {
						vm.presences.push(presence);
					});
				}, console.error);
				memberService.getAbsences(member).subscribe(function(absences) {
					$timeout(function() {
						vm.absences = absences.map(function(absence) {
							if (absence.start) {
								absence.start = new Date(absence.start);
							}
							if (absence.end) {
								absence.end = new Date(absence.end);
							}
							return absence;
						});
					})
				}, console.error);
			}

			this.newAbsence = function() {
				var modalInstance = $uibModal.open({
					animation : true,
					ariaLabelledBy : 'modal-title',
					size : 'bg',
					ariaDescribedBy : 'modal-body',
					templateUrl : 'app/components/member/new-absence.html',
					controller : 'NewAbsenceCtrl',
					controllerAs : 'newAbsenceCtrl',
					resolve : {
						member : function() {
							return vm.member;
						}
					}
				});

				rx.Observable.fromPromise(modalInstance.result)//
				.flatMap(function(absence) {
					return memberService.saveAbsence(absence);
				}).subscribe(console.log, console.log, function() {
					getAbsences(vm.member);
				});
			}

			this.removeAbsence = function(absence) {
				return absenceService.remove(absence).subscribe(console.log, console.error, function() {
					getAbsences(vm.member);
				})
			}

			this.updateAbsence = function(absence) {
				absenceService.update(absence).subscribe(console.log, console.error, function() {
					$timeout(function() {
						vm.editAbsenceId = null;
						getAbsences(vm.member);
					})
				});
			}
			this.cancelUpdateAbsence = function(absence) {
				vm.editAbsenceId = null;
				getAbsences(vm.member);
			}

		} ]);
