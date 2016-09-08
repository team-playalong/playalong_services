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
            function addRemoveFavorites(params) {
                return new Promise(function (resolve, reject) {
                    if (!login.isLoggedIn()) {
                        reject({
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
                            resolve(data);
                        });
                    }
                    else {
                        PlyFirebase.insert(favoritesRelPath, {
                            chordKey: params.chordObj.chordKey,
                            artist: params.chordObj.artist,
                            title: params.chordObj.title,
                            creationDate: Date.now(),
                        })
                            .then(function (data) {
                            resolve(data);
                        });
                    }
                });
            }
            function getFavorites(userKey) {
                return new Promise(function (resolve, reject) {
                    PlyFirebase.getNode({
                        relPath: 'users/' + userKey + '/favorites',
                        isOnce: true
                    })
                        .then(function (data) {
                        if (!!data) {
                            resolve(data);
                        }
                        else {
                            reject({
                                message: 'No favorites found'
                            });
                        }
                    });
                });
            }
            function isChordFavorite(userKey, chordKey) {
                return new Promise(function (resolve, reject) {
                    var relPath = 'users/' + userKey + '/favorites';
                    PlyFirebase.selectSimpleQuery(relPath, 'chordKey', 'equalTo', chordKey)
                        .then(function (data) {
                        resolve(!!data);
                    });
                });
            }
            return {
                addRemoveFavorites: addRemoveFavorites,
                getFavorites: getFavorites,
                isChordFavorite: isChordFavorite,
            };
        }]);
})();
//# sourceMappingURL=user.service.js.map