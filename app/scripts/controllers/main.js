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
  		$http.get(config.paths.mocks.hebrewChord)
	    .success(function(response) {
	    	console.log(response);
	    	chords.addChord(response);

	    });
  	};

  	$scope.getChordById = function() {
  		chords.getChordById(1)
      .then(function(data) {
        $scope.resultJson = data; 
      })
      .catch(function(data) {
        $scope.resultJson = data; 
      });
  	};

    $scope.searchBy = 'artist';
    $scope.searchChord = function(searchBy, searchText) {
      chords.searchChordsBy(searchBy,searchText)
      .then(function(data) {
        $scope.resultJson = data; 
      })
      .catch(function(data) {
        $scope.resultJson = data; 
      });
    };
  }]);
