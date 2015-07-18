'use strict';

/**
 * @ngdoc service
 * @name gitHubApp.chords
 * @description
 * # chords
 * Factory in the gitHubApp.
 */
angular.module('playalong.services')
  .factory('chords',['config','$firebaseArray','$q', function (config,$firebaseArray,$q) {
    var ref = new Firebase(config.paths.firebase +'/chords');
    var chordsData = $firebaseArray(ref);

    function addChord(chordObj) {
      //TODO validate data        
      chordsData.$add(chordObj);
      console.log('all good');
    }

    function getChordById(chordId) {
      var deferred = $q.defer();

      ref.orderByChild("id").equalTo(chordId).on("value", function(snapshot) {
        //Extract the object
        var rawData = snapshot.val();

        if (!rawData) {
          deferred.reject('No Chord with Id ' + chordId);
        }
        var result;
        //Currently Workaround
        angular.forEach(rawData, function(value) {
          result = value;
        });
        deferred.resolve(result);
      });
      
      return deferred.promise;
    }

    function searchChordsBy(searchBy, searchText) {
      var deferred = $q.defer();

      //TODO - data validation
      ref.orderByChild(searchBy).startAt(searchText).endAt(searchText+'~').on("value", function(snapshot) {
        //Extract the object
        var rawData = snapshot.val();

        if (!rawData) {
          deferred.reject('No results for query ' + searchText +', search by ' + searchBy);
        }
        var result;
        //Currently Workaround
        angular.forEach(rawData, function(value) {
          result = value;
        });
        deferred.resolve(result);
      });
      
      return deferred.promise;
    }

    // Public API here
    return {
      addChord: addChord,
      getChordById: getChordById,
      searchChordsBy: searchChordsBy
    };
  }]);
