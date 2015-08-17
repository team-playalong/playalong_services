'use strict';

/**
 * @ngdoc service
 * @name playalongServicesApp.Auth
 * @description
 * # Auth
 * Factory in the playalongServicesApp.
 */
angular.module('playalong.services')
  .factory("Auth", ['$firebaseAuth','config',function($firebaseAuth,config) {
    var usersRef = new Firebase(config.paths.firebase +'/users');
    return $firebaseAuth(usersRef);
}])
  .factory('login', ['$q','Auth','config', '$firebaseArray', function ($q,Auth, config,$firebaseArray) {
    Auth.$onAuth(function(authData) {
      if (authData === null) {
        console.log("Not logged in yet");
      } else {
        console.log("Logged in as", authData.uid);        

        //Check if user is signed up
        var usersRef = new Firebase(config.paths.firebase +'/users');
        usersRef.orderByChild("uid").equalTo(authData.uid).on("value", function(snapshot) {
          var rawData = snapshot.val();

          if (!rawData) {
            console.log('user ' + authData.uid +' doesnt exist');
            //Add it
            var email, firstName, lastName;
            switch(authData.auth.provider){
              case 'facebook':
                email = authData.facebook.email;
                firstName = authData.facebook.cachedUserProfile.first_name;
                lastName = authData.facebook.cachedUserProfile.last_name;
                break;
              case 'password':
                email = authData.password.email;
                firstName = '';
                lastName = '';
                break;
              case 'google':
                email = authData.google.email;
                firstName = authData.google.cachedUserProfile.given_name;
                lastName = authData.google.cachedUserProfile.family_name;
                break;
              default:
                break;
            }
            var usersData = $firebaseArray(usersRef);
            usersData.$add({
              //TODO - Validations and extract by platform
              uid: authData.uid,
              email: email,
              firstName: firstName,
              lastName: lastName
            });
          }
        }); 
        console.log(authData);
      }
      
    });

    var loginEmail = function(email,password) {
      var deferred = $q.defer();

      var ref = new Firebase(config.paths.firebase);
      ref.authWithPassword({
        email    : email,
        password : password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
          deferred.reject(error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          deferred.resolve(userData);
        }
      });

      return deferred.promise;
    };

    var loginSocial = function(platform) {
      var deferred = $q.defer();

      var scope = {
        scope: 'email' //Needed permissions
      };

      Auth.$authWithOAuthRedirect(platform, scope).then(function(authData) {
            // User successfully logged in
            console.log(authData);
            
            deferred.resolve(authData);
      }).catch(function(error) {
        if (error.code === "TRANSPORT_UNAVAILABLE") {
          Auth.$authWithOAuthPopup(platform).then(function(authData) {
            // User successfully logged in. We can log to the console
            // since we’re using a popup here
            console.log(authData);
            deferred.resolve(authData);
          });
        } else {
          // Another error occurred
          console.log(error);
          deferred.reject(error);
        }
      });

      return deferred.promise;
    };
    
    return {
      loginSocial: loginSocial,
      loginEmail: loginEmail
    };
  }]);


