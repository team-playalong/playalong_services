'use strict';

/**
 * @ngdoc function
 * @name gitHubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gitHubApp
 */
angular.module('playalong.services')
  .controller('MainCtrl',['$scope','config','$http', 'chords',
  				 function ($scope,config,$http,chords) {
  	$scope.addChord = function() {
  		$http.get(config.paths.mocks.singleChord)
	    .success(function(response) {
	    	console.log(response);
	    	chords.addChord(response);

	    });
  	};

  	$scope.getChordById = function() {
  		$scope.chordId = 1;
  		$scope.resultJson = chords.getChordById($scope.chordId);
  	};
  }]);
