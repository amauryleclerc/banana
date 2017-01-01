"use strict";
angular.module('sprintGraphApp').controller('GraphCtrl',  ['SprintService', function (sprintService) {
	var vm = this;
	this.sprints = [];
	this.pretty ="";
    sprintService.get(function(resultat){
        vm.sprints = resultat;
        vm.pretty= JSON.stringify(resultat, null, 4)
    });

}]);
