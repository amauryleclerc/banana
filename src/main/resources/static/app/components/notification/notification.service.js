"use strict";
angular.module('sprintGraphApp').factory('NotificationService', [  'rx', function( rx) {

	var alert = new rx.Subject();


	return {
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