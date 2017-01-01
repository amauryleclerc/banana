"use strict";
angular.module('sprintGraphApp').controller('AdminCtrl', ['SprintService', function (sprintService) {
    this.sprints = [];
	this.sprint = {
    stories:[]
  };
    var vm = this;
    this.save = function(){
        sprintService.save(this.sprint);
    }


    this.addStory = function(){
        vm.sprint.stories.push({});
    }

    this.dateOptions = {
        startingDay: 1
      };
}]);
