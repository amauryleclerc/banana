"use strict";
angular.module('sprintGraphApp').factory('MemberService', [ 'MemberResource', 'rx',  function(memberResource, rx ) {

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
		}
	};
} ]);