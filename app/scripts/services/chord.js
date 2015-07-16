

/**
 * @ngdoc service
 * @name playalongServicesApp.chord
 * @description
 * # chord
 * Factory in the playalongServicesApp.
 */

angular.module('playalong.services')
  .factory('chord', ['$firebaseObject','config', function ($firebaseObject, config) {
    'use strict';

    var ref = new Firebase(config.paths.firebase + '/test');  

  // download the data into a local object
  var testChord = $firebaseArray(ref);



  function getChordsById(chordId) {

  }

  function addChord(chordObj) {
    //TODO validate chord object
    testChord.$add(chordObj);
  }
    // Public API here
    return {
      getChordsById: getChordsById,
      addChord: addChord
    };
  }]);
