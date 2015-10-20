'use strict';

/**
 * @ngdoc service
 * @name playalongservicesApp.user
 * @description
 * # user
 * Service in the playalongservicesApp.
 */
angular.module('playalong.services')
  .service('user', ['config','$firebaseArray',function (config,$firebaseArray) {
    var ref = new Firebase(config.paths.firebase + 'users');
    var usersData = $firebaseArray(ref);

    console.log(usersData);

    function addRemoveFavorites(userKey, chordKey,isAddFlag) {
    	console.log(isAddFlag);
    	console.log(chordKey);
        
    	//Get the user's favorite section
    	//TODO - error handling
      var localRef = new Firebase(ref + '/' + userKey + '/favorites/' + chordKey);
      localRef.orderByChild("isFavorite").once("value", function(snapshot) {
      	console.log(snapshot.val());
        // localRef.child('isFavorite').set((snapshot.val().hitCount || 0 )+1);
      }); 
    }

    return {
    	addRemoveFavorites: addRemoveFavorites
    };
  }]);
