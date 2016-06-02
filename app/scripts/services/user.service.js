(function () {
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
        .service('user', ['config', 'PlyFirebase', '$q', 'login',
        function (config, PlyFirebase, $q, login) {
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
            var addRemoveFavorites = function (params) {
                var deferred = $q.defer();
                if (!login.isLoggedIn()) {
                    deferred.reject({
                        message: 'user is not logged in'
                    });
                }
                params = params || {};
                //Get the user's favorite section
                params.chordObj = params.chordObj || {};
                var favoritesRelPath = 'users/' + params.userKey + '/favorites/';
                if (!params.isAddFlag) {
                    PlyFirebase.removeWithQuery(favoritesRelPath, 'chordKey', 'equalTo', params.chordObj.chordKey)
                        .then(function (data) {
                        deferred.resolve(data);
                    });
                }
                else {
                    PlyFirebase.insert(favoritesRelPath, {
                        chordKey: params.chordObj.chordKey,
                        artist: params.chordObj.artist,
                        title: params.chordObj.title,
                        creationDate: new Date()
                    })
                        .then(function (data) {
                        deferred.resolve(data);
                    });
                }
                return deferred.promise;
            };
            var getFavorites = function (userKey) {
                var deferred = $q.defer();
                PlyFirebase.getNode({
                    relPath: 'users/' + userKey + '/favorites',
                    isOnce: true
                })
                    .then(function (data) {
                    console.log('msg');
                    if (!!data) {
                        deferred.resolve(data);
                    }
                    else {
                        deferred.reject({
                            message: 'No favorites found'
                        });
                    }
                });
                return deferred.promise;
            };
            var isChordFavorite = function (userKey, chordKey) {
                var deferred = $q.defer();
                var relPath = 'users/' + userKey + '/favorites';
                PlyFirebase.selectSimpleQuery(relPath, 'chordKey', 'equalTo', chordKey)
                    .then(function (data) {
                    deferred.resolve(!!data);
                });
                return deferred.promise;
            };
            return {
                addRemoveFavorites: addRemoveFavorites,
                getFavorites: getFavorites,
                isChordFavorite: isChordFavorite
            };
        }]);
})();
//# sourceMappingURL=user.service.js.map