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
  .factory('login', ['$q','Auth','config',function ($q,Auth, config) {
    Auth.$onAuth(function(authData) {
      if (authData === null) {
        console.log("Not logged in yet");
      } else {
        console.log("Logged in as", authData.uid);
      }
      // $scope.authData = authData; // This will display the user's name in our view
      console.log(authData);
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

      Auth.$authWithOAuthRedirect(platform).then(function(authData) {
            // User successfully logged in
            console.log(authData);
            deferred.resolve(authData);
      }).catch(function(error) {
        if (error.code === "TRANSPORT_UNAVAILABLE") {
          Auth.$authWithOAuthPopup("facebook").then(function(authData) {
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


