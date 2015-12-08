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
  .factory('login', ['$q','Auth','config', '$firebaseArray', 'customerIoHelper','$rootScope',
    function ($q,Auth, config,$firebaseArray,customerIoHelper,$rootScope) {
    
    var userModel,
        authModel;

    Auth.$onAuth(function(authData) {
      if (authData === null) {
        userModel = null;
        authModel = null;
      } 
      else {
        authModel = authData;
        //Check if user is signed up
        var usersRef = new Firebase(config.paths.firebase +'/users');
        usersRef.orderByChild("uid").equalTo(authData.uid).on("value", function(snapshot) {
          var rawData = snapshot.val();

          if (!rawData) {
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

            userModel = {
              //TODO - Validations and extract by platform
              uid: authData.uid,
              email: email,
              firstName: firstName,
              lastName: lastName,
              userType: 'normal',
              creationDate: new Date().getTime() / 1000
            };

            usersData.$add(userModel);
          }
          else {

            userModel = rawData[Object.keys(rawData)[0]]; 

            //Append the key to the model
            userModel.userKey = Object.keys(rawData)[0];

          }
          $rootScope.$broadcast('plyUserLoggedIn');
            
          //Identify against customerIo
          customerIoHelper.identifyUser(userModel);
        }); 
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

      Auth.$authWithOAuthPopup(platform, scope).then(function(authData) {
            // User successfully logged in
            deferred.resolve(authData);
      }).catch(function(error) {
        if (error.code === "TRANSPORT_UNAVAILABLE") {
          Auth.$authWithOAuthRedirect(platform).then(function(authData) {
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

    var getUser = function() {
      return userModel; 
    };

    var isLoggedIn = function() {
      return !!userModel;
    };

    var logout = function() {
      Auth.$unauth();
      $rootScope.$broadcast('plyUserLoggedOut');
    };
      
    var getAuth = function() {
      return authModel;
    };

    var getFullName = function() {
      return this.getFirstName() + ' ' + this.getLastName();
    };

    var getLastName = function() {
      return userModel ? userModel.lastName : '';
    };

    var getFirstName = function() {
      return userModel ? userModel.firstName : '';
    };

    var isSuperUser = function() {
      return  this.getUser() && this.getUser().userType && 
              (this.getUser().userType.indexOf('superuser') !== -1 || this.getUser().userType.indexOf('admin') !== -1) ;  
    };


    return {
      loginSocial: loginSocial,
      loginEmail: loginEmail,
      getUser: getUser,
      getAuth: getAuth,
      isLoggedIn: isLoggedIn,
      logout: logout,
      getFirstName: getFirstName,
      getLastName: getLastName, 
      getFullName: getFullName,
      isSuperUser: isSuperUser
    };
  }]);


