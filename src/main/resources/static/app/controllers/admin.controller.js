"use strict";
angular.module('sprintGraphApp').controller('AdminCtrl', ['SprintService', '$scope', function (sprintService,$scope) {
    this.sprints = [];
	this.sprint = {
    stories:[]
  };
    var vm = this;
    this.save = function(){
        sprintService.save(this.sprint);
    }

    sprintService.get(function(resultat){
        vm.sprints = resultat;
    });
    this.addStory = function(){
        vm.sprint.stories.push({});
    }

    this.dateOptions = {
        startingDay: 1
      };
}]);
