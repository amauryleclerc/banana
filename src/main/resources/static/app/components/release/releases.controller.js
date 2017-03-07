"use strict";
angular.module('sprintGraphApp').controller('ReleasesCtrl',
		[ 'ReleaseService', 'NotificationService','$timeout', '$uibModal', 'rx', '$state', function(releaseService, notificationService, $timeout, $uibModal, rx, $state) {
			this.releases = [];
			this.editReleaseId = null;
			var vm = this;
			function getReleases() {
				releaseService.getAll().subscribe(function(releases) {
					$timeout(function() {
						vm.releases = releases.map(function(release) {
							if (release.start) {
								release.start = new Date(release.start);
							}
							if (release.end) {
								release.end = new Date(release.end);
							}
							return release;
						});
					})
				});
			}
			getReleases();
			this.update = function(release){
				releaseService.update(release).subscribe(console.log, console.error, function() {
					$timeout(function() {
						vm.editReleaseId = null;
						getReleases();
					})
				});
			}
			this.remove = function(release){
				return releaseService.remove(release).subscribe(console.log, console.error, getReleases)
			}
			this.dateOptions = {
				startingDay : 1
			};
			this.cancelUpdate = function(){
				vm.editReleaseId = null;
				getReleases();
			}
			this.newRelease = function() {
				var modalInstance = $uibModal.open({
					animation : true,
					ariaLabelledBy : 'modal-title',
					size : 'bg',
					ariaDescribedBy : 'modal-body',
					templateUrl : 'app/components/sprint/new-release.html',
					controller : 'NewReleaseCtrl',
					controllerAs : 'newReleaseCtrl'
	
				});
				rx.Observable.fromPromise(modalInstance.result)//
				.flatMap(function(release) {
					return releaseService.save(release);
				}).subscribe(function(release){
					notificationService.setSuccess("added",{item:release.name});
				}, function(error){
					if(error != "cancel"){
						notificationService.setHttpError(error);
					}
				}, getReleases)

			}

			this.showRelease= function(release){
				$state.go('release',{id:release.id});
			}
			
			
		} ]);
