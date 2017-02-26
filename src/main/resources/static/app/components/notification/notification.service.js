"use strict";
angular.module('sprintGraphApp').factory('NotificationService', [  'rx', '$translate', function( rx, $translate) {

	var alert = new rx.Subject();


	return {
		setError : function(msg){
			var transMsg = $translate.instant(msg);
			alert.onNext({msg:transMsg,
				isError:true});
		},
		setError : function(msg,param){
			var transMsg = $translate.instant(msg,param);
			alert.onNext({msg:transMsg,
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
			var transMsg = $translate.instant(msg);
			alert.onNext({msg:transMsg,
				isError:false});
		},
		setSuccess :function(msg,param){
			var transMsg = $translate.instant(msg,param);
			alert.onNext({msg:transMsg,
				isError:false});
		},
		getAlert : function(){
			return alert.asObservable();
		}
	}
} ]);