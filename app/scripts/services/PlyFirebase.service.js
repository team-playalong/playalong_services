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
        if (!firebase.apps || !firebase.apps.length) {
            firebase.initializeApp(config);
        }
        var getRef = function (path) { return firebase.database().ref(path); };
        var auth = firebase.auth();
        function selecteByAggregate(relPath, fieldName, operator) {
            fieldName = fieldName.trim();
            operator = operator.trim();
            return new Promise(function (resolve, reject) {
                var ref = getRef(relPath);
                ref
                    .orderByChild(fieldName)
                    .once('value')
                    .then(function (snapshot) {
                    resolve(getMax(snapshot, fieldName));
                });
            });
        }
        function getMax(collection, fieldName) {
            if (fieldName === void 0) { fieldName = ''; }
            var max;
            var maxItem;
            var currentItem;
            fieldName = fieldName.trim();
            collection.forEach(function (curr) {
                currentItem = curr.val();
                if (!max || currentItem[fieldName] > max) {
                    max = currentItem[fieldName];
                    maxItem = currentItem;
                }
            });
            return maxItem;
        }
        function selectSimpleQuery(relPath, fieldName, operator, fieldValue, refFlag) {
            fieldName = fieldName.trim();
            operator = operator.trim();
            if (typeof fieldValue === 'string') {
                fieldValue = fieldValue.trim();
            }
            return new Promise(function (resolve, reject) {
                var ref = getRef(relPath);
                ref
                    .orderByChild(fieldName)[operator](fieldValue)
                    .once('value')
                    .then(function (snapshot) {
                    var res = refFlag ? snapshot : snapshot.val();
                    resolve(res);
                });
            });
        }
        ;
        function removeWithQuery(relPath, fieldName, operator, fieldValue) {
            fieldName = fieldName.trim();
            operator = operator.trim();
            if (typeof fieldValue === 'string') {
                fieldValue = fieldValue.trim();
            }
            return new Promise(function (resolve, reject) {
                selectSimpleQuery(relPath, fieldName, operator, fieldValue, true)
                    .then(function (data) {
                    if (data.hasChildren()) {
                        data.forEach(function (childRef) {
                            childRef.ref.remove();
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
                ref.once('value')
                    .then(function (snapshot) {
                    if (params.isFirebaseObject) {
                        resolve($firebaseObject(snapshot.ref));
                    }
                    else {
                        resolve(snapshot.val());
                    }
                })
                    .catch(function (error) {
                    debugger;
                    reject({ message: 'Node does not exist', error: error });
                });
            });
        }
        ;
        function signOut() {
            return auth.signOut();
        }
        return {
            auth: auth,
            googleProvider: new firebase.auth.GoogleAuthProvider(),
            facebookProvider: new firebase.auth.FacebookAuthProvider(),
            getRef: getRef,
            insert: insert,
            selectSimpleQuery: selectSimpleQuery,
            removeWithQuery: removeWithQuery,
            signOut: signOut,
            getNode: getNode,
            selecteByAggregate: selecteByAggregate,
        };
    }
    angular.module('playalong.services')
        .service('PlyFirebase', PlyFirebase);
})();
//# sourceMappingURL=PlyFirebase.service.js.map