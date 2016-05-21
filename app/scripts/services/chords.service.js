(function () {
    'use strict';
    chords.$inject = ['config', '$q', 'PlyFirebase'];
    function chords(config, $q, PlyFirebase) {
        var chordsRef = PlyFirebase.getRef('chords');
        // var chordsData = $firebaseArray(ref);
        function increaseChordHitCount(chordKey) {
            return new Promise(function (resolve, reject) {
                var localRef = chordsRef.child(chordKey);
                localRef.orderByChild('hitCount').once('value')
                    .then(function (snapshot) {
                    var oldHitCount = snapshot.val().hitCount || 0;
                    localRef.update({ hitCount: oldHitCount + 1 });
                    resolve();
                })
                    .catch(function (error) { return reject(error); });
            });
        }
        function extractApprovedChords(rawData) {
            var result = [];
            //Currently Workaround
            angular.forEach(rawData, function (value, chordKey) {
                if (value.approved) {
                    value.chordKey = chordKey;
                    result.push(value);
                }
            });
            return result;
        }
        // function addChord(chordObj) {
        //   //TODO validate data        
        //   //initialize data
        //   chordObj.hitCount = 0;
        //   chordObj.rating = 1;
        //   chordObj.countRating = 0;
        //   var request = chordsData.$add(chordObj)
        //   .then(function(ref) {
        //     return $firebaseObject(ref);
        //   });
        //   return request;
        // }
        function getChordById(chordId) {
            return chordsRef.child(chordId);
        }
        function searchChordsBy(searchBy, searchText) {
            var deferred = $q.defer();
            //TODO - data validation
            chordsRef.orderByChild(searchBy)
                .startAt(searchText)
                .endAt(searchText + '~')
                .once('value', function (snapshot) {
                //Extract the object
                var rawData = snapshot.val();
                if (!rawData) {
                    deferred.reject('No results for query ' + searchText + ', search by ' + searchBy);
                }
                var result = extractApprovedChords(rawData);
                deferred.resolve(result);
            });
            return deferred.promise;
        }
        function getTopChords(limitTo) {
            var deferred = $q.defer();
            //TODO - data validation
            chordsRef.orderByChild('hitCount').limitToLast(limitTo)
                .on('value', function (snapshot) {
                //Extract the object
                var rawData = snapshot.val();
                if (!rawData) {
                    deferred.reject('No results for query getTopChords');
                }
                var result = extractApprovedChords(rawData);
                deferred.resolve(result);
            });
            return deferred.promise;
        }
        /**
         * Add a rating to a chord and +1 to the total number of raters
         */
        function rateChord(chordKey, newRating) {
            var deferred = $q.defer();
            if (newRating < 1 || newRating > 5) {
                deferred.reject('Rating value should be between 1 - 5');
            }
            var localRef = new Firebase(chordsRef + '/' + chordKey);
            localRef.once('value', function (snapshot) {
                var countRating = snapshot.val().countRating || 1;
                var rating = snapshot.val().rating || 1;
                //New weighted average
                rating = ((rating * countRating) + (newRating * 1)) / (countRating + 1);
                rating = Math.round(rating);
                rating = Math.min(rating, 5);
                localRef.child('countRating').set(countRating + 1);
                localRef.child('rating').set(rating);
                return deferred.resolve();
            }, function (errorObject) {
                deferred.reject(errorObject);
            });
            //TODO - add the rating to the user as well
            return deferred.promise;
        }
        // Public API here
        return {
            // addChord: addChord,
            getChordById: getChordById,
            searchChordsBy: searchChordsBy,
            increaseChordHitCount: increaseChordHitCount,
            getTopChords: getTopChords,
            rateChord: rateChord
        };
    }
    angular.module('playalong.services')
        .factory('chords', chords);
})();
//# sourceMappingURL=chords.service.js.map