"use strict";
angular.module('sprintGraphApp').controller('GraphCtrl', ['SprintService', '$timeout', function (sprintService, $timeout) {
	var vm = this;
	this.sprints = [];
	this.sprint = null;
	this.pretty ="";
	
	this.start_time = getNow();

console.log(this.start_time)

	    
    sprintService.getAll().subscribe(function(resultat){
    	$timeout(function(){
            vm.sprints = resultat._embedded.sprints;
            if( vm.sprints.length >0){
                vm.sprint = resultat._embedded.sprints[0];
                vm.onSprintChange();
            }
            vm.pretty= JSON.stringify(resultat, null, 4);
            
    	})
    });
    
    this.onSprintChange = function(){
    	vm.chartConfig.title.text = vm.sprint.id;
    	sprintService.getStories(vm.sprint).subscribe(function(resultat){
    		$timeout(function(){
    			updateChart(resultat._embedded.stories);
    	 	});
    	});
    }
    function getNow(){
    	return Date.now();
    }
    function updateChart(stories){
    	var complexity = stories.map(function(story){
	 			if(story.complexity){
	 			return [getNow(),story.complexity];
	 		}
	 		return  [getNow(),0];
	 		});
    	console.log(complexity);
    	 	vm.chartConfig.series = [{
    	 		 name: 'Complexity',
    	 		 data : complexity
    	 	} ]
    }
    
    this.chartConfig  = {
            title: {
                text: "",
                x: -20 //center
            },
            xAxis : {
          	  type: 'datetime',
          	  pointStart: vm.start_time
          	},
            series: []
        }

}]);
