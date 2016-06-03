(function() {
  'use strict';

  chords.$inject = ['config', '$q', 'PlyFirebase', '$firebaseObject'];
  function chords(config, $q: ng.IQService, PlyFirebase, $firebaseObject) {
    const chordsRef = PlyFirebase.getRef('chords');
    // var chordsData = $firebaseArray(ref);

    function increaseChordHitCount(chordKey: string) {
      return new Promise((resolve, reject) => {
        const localRef = chordsRef.child(chordKey);
        localRef.orderByChild('hitCount').once('value')
          .then((snapshot) => {
            const oldHitCount = snapshot.val().hitCount || 0;
            localRef.update({ hitCount: oldHitCount + 1 });
            resolve();
          })
          .catch(error => reject(error));
      });
    }

    function extractApprovedChords(rawData) {
      var result = [];
      //Currently Workaround
      angular.forEach(rawData, function(value, chordKey) {
        if (value.approved) {
          value.chordKey = chordKey;
          result.push(value);
        }
      });

      return result;
    }

    function addChord(chordObj) {
      return new Promise((resolve, reject) => {
        //TODO validate data

        //initialize data
        chordObj.hitCount = 0;
        chordObj.rating = 1;
        chordObj.countRating = 0;

        PlyFirebase.insert('chords', chordObj)
        .then(result => resolve(result))
        .catch(error => reject(error));
      });

    }

    function getChordById(params: {chordId: string, isFirebaseObject: boolean}) {
      return PlyFirebase.getNode({
        relPath: `chords/${params.chordId}`,
        isOnce: true,
        isFirebaseObject: params.isFirebaseObject,
      });
    }

    function searchChordsBy(searchBy, searchText) {
      return new Promise((resolve, reject) => {
        //TODO - data validation
        chordsRef
        .orderByChild(searchBy)
        .startAt(searchText)
        .endAt(`${searchText}~`)
        .once('value')
        .then((snapshot) => {
          //Extract the object
          const rawData = snapshot.val();
          if (!rawData) {
            reject(`No results for query ${searchText} searching by ${searchBy}`);
          }
          const result = extractApprovedChords(rawData);
          resolve(result);
        });
      });
    }

    function getTopChords(limitTo) {
      return new Promise((resolve, reject) => {
        //TODO - data validation
        chordsRef
          .orderByChild('hitCount').limitToLast(limitTo)
          .once('value')
          .then((snapshot) => {
            //Extract the object
            const rawData = snapshot.val();
            if (!rawData) {
              reject('No results for query getTopChords');
            }
            const result = extractApprovedChords(rawData);
            resolve(result);
          });
      });
    }

    /**
     * Add a rating to a chord and +1 to the total number of raters
     */
    function rateChord(chordKey, newRating) {
      return new Promise((resolve, reject) => {
        if (newRating < 1 || newRating > 5) {
          reject('Rating value should be between 1 - 5');
        }
        const localRef = PlyFirebase.getRef(`chords/${chordKey}`);
        localRef.once('value')
        .then((snapshot) => {
          const countRating = snapshot.val().countRating || 1;
          let rating = snapshot.val().rating || 1;

          //New weighted average
          rating = ((rating * countRating) + (newRating * 1)) / (countRating + 1);
          rating = Math.round(rating);
          rating = Math.min(rating, 5);
          localRef.child('countRating').set(countRating + 1);
          localRef.child('rating').set(rating);
          return resolve();
        })
        .catch((error) => reject(error));
        //TODO - add the rating to the user as well
      });
    }

    // Public API here
    return {
      addChord,
      getChordById,
      searchChordsBy,
      increaseChordHitCount,
      getTopChords,
      rateChord,
    };
}

  angular.module('playalong.services')
    .factory('chords', chords);
})();
