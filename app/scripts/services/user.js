'use strict';

/**
 * @ngdoc service
 * @name playalongservicesApp.user
 * @description
 * # user
 * Service in the playalongservicesApp.
 */
/*jshint unused:false*/
angular.module('playalong.services')
  .service('user', ['config','$firebaseArray',function (config,$firebaseArray) {
    var ref = new Firebase(config.paths.firebase + 'users');
    var usersData = $firebaseArray(ref);

    function addRemoveFavorites(userKey, chordKey,isAddFlag) {
    	//Get the user's favorite section
      var callback = function() {
        
      };
      var localRef = new Firebase(ref + '/' + userKey + '/favorites/' + chordKey);

    }

    return {
    	addRemoveFavorites: addRemoveFavorites
    };
  }]);
