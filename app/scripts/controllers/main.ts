(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name gitHubApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the gitHubApp
   */
  angular.module('playalong.services')
  .config(function($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
  })
  .controller('MainCtrl',['$scope','config','$http', 'chords','login','user','transposer',
   function ($scope,config,$http,chords,login,user,transposer) {
      $scope.login = login;
      $scope.transposer = transposer;
      $scope.chordRef = null;
      $scope.test = 'ltr';

      $scope.addChord = function() {
        $http.get(config.paths.mocks.hebrewChord)
        .success(function(response) {

          chords.addChord(response)
          .then(function(chord) {
            $scope.chordRef = chord;
            //We now have a reference to the entire object
            $scope.chordRef.$bindTo($scope, 'newChord').then(function() {
              console.log('binded!');
            });
          });
        });
      };

      $scope.increaseChordHitCount = function(chord) {
        chords.increaseChordHitCount(chord.chordKey);
      };

      $scope.isAddFlag = false;
      $scope.addToFavorites = function() {
        var userModel = login.getUser();
        var params = {
          userKey: userModel.userKey,
          isAddFlag: $scope.isAddFlag,
          chordObj: {
            chordKey: '-JxLKLUR8irZN0TA__XK',
            artist: 'Asaf Avidan',
            title: 'Gold Shadow'
          }
        };
        user.addRemoveFavorites(params)
        .then(function(data) {
          console.log(data);
          console.log('added to favorites');
        });
      };

      $scope.getChordById = function() {
        chords.getChordById({ chordId: '-JxLKLUR8irZN0TA__XK', isFirebaseObject: false })
        .then(chord => {
          $scope.newChord = chord;
        })
        .catch(error => console.error(error));
      };
      $scope.getChordById();

      $scope.searchBy = 'artist';
      $scope.searchChord = function(searchBy, searchText) {
        chords.searchChordsBy(searchBy, searchText)
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

      $scope.loginEmail = (email, password) => {
        login.loginEmail(email, password)
        .then(function(data){
          console.log(data);
        })
        .catch(function(error) {
          console.log(error);
        });
      };

      setTimeout(function() {

        var chords = angular.element(document.querySelector('.transposeArea .chord'));

        angular.forEach(chords, function(value){
          var oldText = angular.element(value).text();
          console.log(oldText);
          var newText = transposer.transpose(oldText,3);
          console.log(newText);
          angular.element(value).text(newText);
        });
      },3000);


      $scope.rateChord = function() {
        chords.rateChord('-JxLKLUR8irZN0TA__XK',1)
        .then(function() {
          console.log('all good');
        });
      };
      $scope.getFavorites = function() {
        user.getFavorites('-K4q5OByh18b-71C6Ju6')
        .then(function(data) {
          $scope.favorites = data;
        })
        .catch(function(data){
          console.warn(data.message);
        });
      };


    }]);

})();
