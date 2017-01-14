"use strict";
angular.module('sprintGraphApp').factory('MemberService', [ 'MemberResource', 'AbsenceService','rx',  function(memberResource,absenceService, rx ) {

	return {
		get:function(id){
			return rx.Observable.fromPromise(memberResource.get({id:id}).$promise);
		},
		save : function(member) {
			return rx.Observable.fromPromise(memberResource.save(member).$promise);
		},
		getAll : function() {
			return rx.Observable.fromPromise(memberResource.get().$promise).map(function(result) {
				return result._embedded.members;
			});
		},
		update:function(member){
			return rx.Observable.fromPromise(memberResource.update({
				id : member.id,
			},member).$promise)
		},
		getAbsences:function(member){
			return rx.Observable.just(member).map(function(s) {
				return s.id;
			}).flatMap(function(id) {
				return rx.Observable.fromPromise(memberResource.getAbsences({
					id : id
				}).$promise)
			}).map(function(result) {
				return result._embedded.absences;
			});
		},
		saveAbsence:function(absence){
			return absenceService.save(absence);
			
			
		}
	};
} ]);