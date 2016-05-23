(function() {
  'use strict';

  function PlyFirebase() {
    
    // Initialize Firebase
    let config;
    if (PLY_CONFIG.env === 'dev') {
      config = {
        apiKey: 'AIzaSyApdtKEld9C-Hbkr62_o4tOPeZl_qiFfTY',
        authDomain: 'playalong.firebaseapp.com',
        databaseURL: 'https://playalong.firebaseio.com',
        storageBucket: 'project-7489461719706903474.appspot.com',
      };
    }
    else { //prod
      config = {
        apiKey: 'AIzaSyAxl5nYfqR_RQPKD0QI_94PWBhpu0C0Q3M',
        authDomain: 'playalong-prod.firebaseapp.com',
        databaseURL: 'https://playalong-prod.firebaseio.com',
        storageBucket: 'playalong-prod.appspot.com',
      };
    }
        
    firebase.initializeApp(config);

    let getRef = (path: string) => firebase.database().ref(path);

    function selectSimpleQuery(relPath: string, fieldName: string, operator: string, fieldValue, refFlag: boolean) {
      return new Promise((resolve, reject) => {
        const ref = getRef(relPath);
        ref
          .orderByChild(fieldName)[operator](fieldValue)
          .once('value')
          .then(snapshot => {
            const res = refFlag ? snapshot : snapshot.val();
            console.log(res);
            resolve(res);
          });
      });
    };  

    function removeWithQuery(relPath: string, fieldName: string, operator: string, fieldValue) {
      return new Promise((resolve, reject) => {
        selectSimpleQuery(relPath, fieldName, operator, fieldValue, true)
          .then((data: any) => {
            if (data.hasChildren()) {
              data.forEach(function(childRef) {
                childRef.ref().remove();
              });
            }
            resolve({
              message: 'success'
            });
          })
          .catch(error => reject(error));
      });
    };

    function insert(relPath: string, dataObj) {
      return new Promise((resolve, reject) => {
        const ref = getRef(relPath);
        if (ref && ref.push) {
          ref.push(dataObj)
          .then(() => {
            resolve({
              message: 'success'
            });
          });
        }
        else {
          setTimeout(reject, 10);
        }
      });
      
    };
  
    function getNode(params) {
      return new Promise((resolve, reject) => {
        params = params || {};
        const ref = getRef(params.relPath);
        const response = params.isOnce ? 'once' : 'on';
        ref[response]('value')
          .then((snapshot) => {
            resolve(snapshot.val());
          })
          .catch(error => reject({ message: 'Node does not exist', error }));
      });
    };

    return {
      auth: firebase.auth(),
      googleProvider: new firebase.auth.GoogleAuthProvider(),
      facebookProvider: new firebase.auth.FacebookAuthProvider(),
      getRef,
      selectSimpleQuery,
      removeWithQuery,
      getNode,
    };
  }

  angular.module('playalong.services')
    .service('PlyFirebase', PlyFirebase);
})();
