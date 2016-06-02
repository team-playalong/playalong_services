(function () {
    'use strict';
    PlyFirebase.$inject = ['$firebaseObject'];
    function PlyFirebase($firebaseObject) {
        // Initialize Firebase
        var config;
        if (PLY_CONFIG.env === 'dev') {
            config = {
                apiKey: 'AIzaSyApdtKEld9C-Hbkr62_o4tOPeZl_qiFfTY',
                authDomain: 'playalong.firebaseapp.com',
                databaseURL: 'https://playalong.firebaseio.com',
                storageBucket: 'project-7489461719706903474.appspot.com',
            };
        }
        else {
            config = {
                apiKey: 'AIzaSyAxl5nYfqR_RQPKD0QI_94PWBhpu0C0Q3M',
                authDomain: 'playalong-prod.firebaseapp.com',
                databaseURL: 'https://playalong-prod.firebaseio.com',
                storageBucket: 'playalong-prod.appspot.com',
            };
        }
        firebase.initializeApp(config);
        var getRef = function (path) { return firebase.database().ref(path); };
        function selectSimpleQuery(relPath, fieldName, operator, fieldValue, refFlag) {
            return new Promise(function (resolve, reject) {
                var ref = getRef(relPath);
                ref
                    .orderByChild(fieldName)[operator](fieldValue)
                    .once('value')
                    .then(function (snapshot) {
                    var res = refFlag ? snapshot : snapshot.val();
                    console.log(res);
                    resolve(res);
                });
            });
        }
        ;
        function removeWithQuery(relPath, fieldName, operator, fieldValue) {
            return new Promise(function (resolve, reject) {
                selectSimpleQuery(relPath, fieldName, operator, fieldValue, true)
                    .then(function (data) {
                    if (data.hasChildren()) {
                        data.forEach(function (childRef) {
                            childRef.ref().remove();
                        });
                    }
                    resolve({
                        message: 'success'
                    });
                })
                    .catch(function (error) { return reject(error); });
            });
        }
        ;
        function insert(relPath, dataObj) {
            return new Promise(function (resolve, reject) {
                var ref = getRef(relPath);
                if (ref && ref.push) {
                    ref.push(dataObj)
                        .then(function (ref) {
                        resolve($firebaseObject(ref));
                    });
                }
                else {
                    setTimeout(reject, 10);
                }
            });
        }
        ;
        function getNode(params) {
            return new Promise(function (resolve, reject) {
                params = params || {};
                var ref = getRef(params.relPath);
                var response = params.isOnce ? 'once' : 'on';
                ref[response]('value')
                    .then(function (snapshot) {
                    resolve(snapshot.val());
                })
                    .catch(function (error) { return reject({ message: 'Node does not exist', error: error }); });
            });
        }
        ;
        return {
            auth: firebase.auth(),
            googleProvider: new firebase.auth.GoogleAuthProvider(),
            facebookProvider: new firebase.auth.FacebookAuthProvider(),
            getRef: getRef,
            insert: insert,
            selectSimpleQuery: selectSimpleQuery,
            removeWithQuery: removeWithQuery,
            getNode: getNode,
        };
    }
    angular.module('playalong.services')
        .service('PlyFirebase', PlyFirebase);
})();
//# sourceMappingURL=PlyFirebase.service.js.map