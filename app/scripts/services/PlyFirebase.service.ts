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

    return {
      auth: firebase.auth(),
      googleProvider: new firebase.auth.GoogleAuthProvider(),
      facebookProvider: new firebase.auth.FacebookAuthProvider(),
      getRef
    };
  }

  angular.module('playalong.services')
    .service('PlyFirebase', PlyFirebase);
})();
