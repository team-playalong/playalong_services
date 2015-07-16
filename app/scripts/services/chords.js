'use strict';

/**
 * @ngdoc service
 * @name gitHubApp.chords
 * @description
 * # chords
 * Factory in the gitHubApp.
 */
angular.module('playalong.services')
  .factory('chords',['config','$firebaseArray', function (config,$firebaseArray) {
    var ref = new Firebase(config.paths.firebase +'/chords');
    var chordsData = $firebaseArray(ref);

    function addChord(chordObj) {
      //TODO validate data        
      chordsData.$add(chordObj);
      console.log('all good');
    }

    function getChordById(chordId) {
      var res = ref.child(chordId);
      console.log(res);

      return res;
    }

    // Public API here
    return {
      addChord: addChord,
      getChordById: getChordById
    };
  }]);
