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
  .service('user', ['config','plyFirebase','$q',
    function (config,plyFirebase,$q) {
    
    function addRemoveFavorites(userKey, chordObj,isAddFlag) {
      var deferred = $q.defer();
    	//Get the user's favorite section
      chordObj = chordObj || {};
      var favoritesRelPath = userKey + '/favorites/';

      if (!isAddFlag)
      {
        plyFirebase.removeWithQuery(favoritesRelPath,'chordKey','equalTo',chordObj.chordKey)
        .then(function(data) {
          deferred.resolve();
        });
      }
      else { //Need to add a new record to the users favorites
        plyFirebase.insert(favoritesRelPath,{
          chordKey: chordObj.chordKey,
          artist: chordObj.artist,
          title: chordObj.title,
          creationDate: new Date()
        });
      }

      return deferred.promise;
    }

    return {
    	addRemoveFavorites: addRemoveFavorites
    };
  }]);
