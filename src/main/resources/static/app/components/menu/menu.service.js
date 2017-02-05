"use strict";
angular.module('sprintGraphApp').factory('MenuService', [ '$rootScope', '$state', 'rx', function($rootScope, $state, rx) {

	var sprintSelected = new rx.BehaviorSubject(null);
	var state = new rx.BehaviorSubject(null);
	var alert = new rx.Subject();

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		state.onNext(toState);
	})

	return {
		getState : function() {
			return state.asObservable()//
			.filter(function(v) {
				return v != null;
			})//
			.distinctUntilChanged();
		},
		getSelectedSprint : function() {
			return sprintSelected.asObservable()//
			.filter(function(v) {
				return v != null;
			})//
			.distinctUntilChanged();
		},
		setSelectedSprint : function(sprint) {
			sprintSelected.onNext(sprint);
		},
		setError : function(msg){
			alert.onNext({msg:msg,
				isError:true});
		},
		setHttpError : function(error){
			var msg ="Unknow error";
			if(error.status === 409){//Conflic
				msg = "Already exist";
			}else if(error.data !=null && error.data.message != null){//Unknow status
				msg = error.data.message;
			}
			
			alert.onNext({msg:msg,
				isError:true});
		},
		setSuccess :function(msg){
			alert.onNext({msg:msg,
				isError:false});
		},
		getAlert : function(){
			return alert.asObservable();
		}
	}
} ]);