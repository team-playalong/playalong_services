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
    
    /**
     * [addRemoveFavorites description]
     * @param  params {
     * isAddFlag: true
     * chordObj : {
     *  chordKey: 
        artist:
        title: 
     * },
     * userKey
     */
    function addRemoveFavorites(params) {
      var deferred = $q.defer();
      params = params || {};
    	//Get the user's favorite section
      params.chordObj = params.chordObj || {};
      var favoritesRelPath = params.userKey + '/favorites/';

      if (!params.isAddFlag)
      {
        plyFirebase.removeWithQuery(favoritesRelPath,'chordKey','equalTo',params.chordObj.chordKey)
        .then(function(data) {
          deferred.resolve(data);
        });
      }
      else { //Need to add a new record to the users favorites
        plyFirebase.insert(favoritesRelPath,{
          chordKey: params.chordObj.chordKey,
          artist: params.chordObj.artist,
          title: params.chordObj.title,
          creationDate: new Date()
        })
        .then(function(data) {
          deferred.resolve(data);
        });
      }

      return deferred.promise;
    }

    return {
    	addRemoveFavorites: addRemoveFavorites
    };
  }]);
