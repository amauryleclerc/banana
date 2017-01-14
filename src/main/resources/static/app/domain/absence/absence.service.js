"use strict";
angular.module('sprintGraphApp').factory('AbsenceService', [ 'AbsenceResource', 'rx',  function(absenceResource, rx ) {

	return {
		get:function(id){
			return rx.Observable.fromPromise(absenceResource.get({id:id}).$promise);
		},
		save : function(absence) {
			if(absence.member){
				absence.member = absence.member._links.self.href;
			}
			
			return rx.Observable.fromPromise(absenceResource.save(absence).$promise);
		},
		getAll : function() {
			return rx.Observable.fromPromise(absenceResource.get().$promise).map(function(result) {
				return result._embedded.absences;
			});
		},
		update:function(absence){
			return rx.Observable.fromPromise(absenceResource.update({
				id : absence.id,
			},absence).$promise)
		},
		remove:function(absence){
			return rx.Observable.fromPromise(absenceResource.remove({
				id : absence.id,
			}).$promise)
		}
	};
} ]);