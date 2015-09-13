'use strict';

/**
 * @ngdoc service
 * @name gitHubApp.chords
 * @description
 * # chords
 * Factory in the gitHubApp.
 */
angular.module('playalong.services')
  .factory('chords',['config','$firebaseArray','$q', '$firebaseObject',function (config,$firebaseArray,$q,$firebaseObject) {
    var ref = new Firebase(config.paths.firebase + 'chords');
    var chordsData = $firebaseArray(ref);

    function increaseChordHitCount(chordKey) {
      
      var localRef = new Firebase(ref + '/' + chordKey);
      localRef.orderByChild("hitCount").once("value", function(snapshot) {
        localRef.child('hitCount').set((snapshot.val().hitCount || 0 )+1);
      }); 


    }

    function addChord(chordObj) {
      //TODO validate data        
      
      //initialize data
      chordObj.hitCount = 0;
      chordObj.rating = 0;
      chordObj.countRating = 0;

      var request = chordsData.$add(chordObj)
      .then(function(ref) {
        return $firebaseObject(ref);
      });

      return request;
    }

    function getChordById(chordId) {
      return $firebaseObject(ref.child(chordId));
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
        var result = [];
        //Currently Workaround
        angular.forEach(rawData, function(value, chordKey) {
          value.chordKey = chordKey;
          result.push(value);
        });
        deferred.resolve(result);
      });
      
      return deferred.promise;
    }

    function getTopChords(limitTo) {
      var deferred = $q.defer();

      //TODO - data validation
      ref.orderByChild('hitCount').limitToLast(limitTo)
      .on("value", function(snapshot) {
        //Extract the object
        var rawData = snapshot.val();
        if (!rawData) {
          deferred.reject('No results for query getTopChords');
        }
        var result = [];
        //Currently Workaround
        angular.forEach(rawData, function(value, chordKey) {
          value.chordKey = chordKey;
          result.push(value);
        });
        deferred.resolve(result);
      });
      
      return deferred.promise; 
    }

    /**
     * Add a rating to a chord and +1 to the total number of raters
     */
    function rateChord(chordKey, newRating)
    {
      var deferred = $q.defer();

      if (newRating < 1 || newRating > 5)
      {
        deferred.reject('Rating value should be between 1 - 5');
      }
      var localRef = new Firebase(ref + '/' + chordKey);
      
      localRef.once('value',function(snapshot) {
          var countRating = snapshot.val().countRating || 0;
          var rating = snapshot.val().rating || 0;

          //New weighted average
          rating = ((rating * countRating) + (newRating*1))/(countRating + 1);
          rating = Math.round(rating);
          rating = Math.max(rating,5);
          localRef.child('countRating').set(countRating + 1);
          localRef.child('rating').set(rating);
          return deferred.resolve();
      },
      function (errorObject) {
          deferred.reject(errorObject);
        });

        
      
      //TODO - add the rating to the user as well

      return deferred.promise;
    }

    // Public API here
    return {
      addChord: addChord,
      getChordById: getChordById,
      searchChordsBy: searchChordsBy,
      increaseChordHitCount: increaseChordHitCount,
      getTopChords: getTopChords,
      rateChord: rateChord
    };
  }]);
