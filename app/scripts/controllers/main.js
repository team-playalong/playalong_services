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
    $scope.chordRef = null;
  	$scope.addChord = function() {
  		$http.get(config.paths.mocks.hebrewChord)
	    .success(function(response) {

	    	chords.addChord(response)
        .then(function(chord) {
          $scope.chordRef = chord;
          //We now have a reference to the entire object
          $scope.chordRef.$bindTo($scope, "newChord").then(function() {
            console.log('binded!');
          });
        });

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
