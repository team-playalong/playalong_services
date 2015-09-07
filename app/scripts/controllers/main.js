'use strict';

/**
 * @ngdoc function
 * @name gitHubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gitHubApp
 */
angular.module('playalong.services')
  .controller('MainCtrl',['$scope','config','$http', 'chords','login','user',
 function ($scope,config,$http,chords,login,user) {
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

    $scope.increaseChordHitCount = function(chord) {
      chords.increaseChordHitCount(chord.chordKey);
    };


    $scope.addToFavorites = function() {

      user.addRemoveFavorites(1,1,$scope.isAddFlag)
      .then(function() {
        console.log('added to favorites');
      });
    };

  	$scope.getChordById = function() {
  		var result = chords.getChordById('-JxLKLUR8irZN0TA__XK');
      if (result)
      {
        result.$bindTo($scope, "newChord");
      }
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

    $scope.loginSocial = function(platform) {
      login.loginSocial(platform)
      .then(function(data){
        console.log(data);
      });
    };

    $scope.loginEmail = function(email,password) {
      login.loginEmail(email,password)
      .then(function(data){
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
      });
    };

    $scope.getTopChords = function(limitTo) {
      chords.getTopChords(limitTo)
      .then(function(data) {
        $scope.topChords = data;
      })
      .catch(function(error) {
        console.error(error);
      });
    };
  }]);
