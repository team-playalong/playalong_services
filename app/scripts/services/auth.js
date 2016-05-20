(function () {
    'use strict';
    function PlyFirebase() {
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
        return {
            auth: firebase.auth(),
            googleProvider: new firebase.auth.GoogleAuthProvider(),
            facebookProvider: new firebase.auth.FacebookAuthProvider(),
            getRef: getRef
        };
    }
    Auth.$inject = ['$firebaseAuth', 'config'];
    function Auth($firebaseAuth, config) {
        var usersRef = new Firebase(config.paths.firebase + '/users');
        return $firebaseAuth(usersRef);
    }
    login.$inject = ['$q', 'Auth', 'config', '$firebaseArray', 'customerIoHelper', '$rootScope', 'PlyFirebase'];
    function login($q, Auth, config, $firebaseArray, customerIoHelper, $rootScope, PlyFirebase) {
        var userModel;
        var authModel;
        function getProviderData() {
            if (authModel && authModel.providerData && authModel.providerData.length) {
                return authModel.providerData[0];
            }
        }
        PlyFirebase.auth.onAuthStateChanged(function (authData) {
            if (authData === null) {
                userModel = null;
                authModel = null;
            }
            else {
                authModel = authData;
                //Check if user is signed up
                var usersRef = PlyFirebase.getRef('users');
                usersRef.orderByChild('uid').equalTo(authData.uid).on('value', function (snapshot) {
                    var rawData = snapshot.val();
                    if (!rawData) {
                        //Add it
                        var email, firstName, lastName, fullName;
                        var providerData = getProviderData();
                        switch (providerData.providerId) {
                            case 'google.com':
                            case 'facebook.com':
                                email = providerData.email;
                                fullName = providerData.displayName.split(' ');
                                firstName = fullName[0];
                                lastName = fullName[1];
                                break;
                            case 'password':
                                email = providerData.email;
                                firstName = '';
                                lastName = '';
                                break;
                            default:
                                break;
                        }
                        userModel = {
                            //TODO - Validations and extract by platform
                            uid: authData.uid,
                            email: email,
                            firstName: firstName,
                            lastName: lastName,
                            userType: 'normal',
                            creationDate: new Date().getTime() / 1000
                        };
                        usersRef.push(userModel);
                    }
                    else {
                        userModel = rawData[Object.keys(rawData)[0]];
                        //Append the key to the model
                        userModel.userKey = Object.keys(rawData)[0];
                    }
                    $rootScope.$broadcast('plyUserLoggedIn');
                    //Identify against customerIo
                    customerIoHelper.identifyUser(userModel);
                    if (!!window.mixpanel) {
                        window.mixpanel.identify(userModel.uid);
                        window.mixpanel.people.set({
                            '$email': userModel.email,
                            '$created': userModel.creationDate || new Date(),
                            '$last_login': new Date(),
                            'firstName': userModel.firstName || '',
                            'lastName': userModel.lastName || '',
                            'userType': userModel.userType || 'normal'
                        });
                        window.mixpanel.track('ply_user_login');
                    }
                });
            }
        });
        function loginEmail(email, password) {
            return new Promise(function (resolve, reject) {
                PlyFirebase.auth.signInWithEmailAndPassword(email, password)
                    .then(function (userData) { return resolve(userData); })
                    .catch(function (error) { return reject(error); });
            });
        }
        function loginSocial(platform) {
            return new Promise(function (resolve, reject) {
                var provider;
                switch (platform) {
                    case 'facebook':
                        provider = PlyFirebase.facebookProvider;
                        break;
                    case 'google':
                        provider = PlyFirebase.googleProvider;
                        break;
                    default:
                        provider = PlyFirebase.googleProvider;
                        break;
                }
                provider.addScope('email');
                PlyFirebase.auth.signInWithPopup(provider)
                    .then(function (authData) {
                    // User successfully logged in
                    userModel = authData.user;
                    resolve(authData);
                })
                    .catch(function (error) { return reject(error); });
            });
        }
        var getUser = function () { return userModel; };
        var isLoggedIn = function () { return !!userModel; };
        function logout() {
            PlyFirebase.signOut()
                .then(function () { return $rootScope.$broadcast('plyUserLoggedOut'); });
        }
        ;
        var getAuth = function () { return authModel; };
        var getFullName = function () { return getFirstName() + ' ' + getLastName(); };
        var getLastName = function () { return userModel ? userModel.lastName : ''; };
        var getFirstName = function () { return userModel ? userModel.firstName : ''; };
        function isSuperUser() {
            return getUser() && getUser().userType &&
                (this.getUser().userType.indexOf('superuser') !== -1 || this.getUser().userType.indexOf('admin') !== -1);
        }
        ;
        function createUser(email, password) {
            return new Promise(function (resolve, reject) {
                PlyFirebase.auth.createUserWithEmailAndPassword(email, password)
                    .then(function (userData) { return resolve(userData); })
                    .catch(function (error) { return reject(error); });
            });
        }
        function resetPassword(email) {
            return new Promise(function (resolve, reject) {
                PlyFirebase.auth.sendPasswordResetEmail(email)
                    .then(function () {
                    console.log("Reset password sent to " + email);
                    resolve();
                })
                    .catch(function (error) { return reject(error); });
            });
        }
        function changePassword(email, oldPassword, newPassword) {
            return new Promise(function (resolve, reject) {
                var ref = new Firebase(config.paths.firebase);
                ref.changePassword({ email: email, oldPassword: oldPassword, newPassword: newPassword }, function (error) {
                    if (error === null) {
                        console.log("Password Changed");
                        resolve();
                    }
                    else {
                        console.log('Error changing password: ', error);
                        reject(error);
                    }
                });
            });
        }
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
            isSuperUser: isSuperUser,
            createUser: createUser,
            resetPassword: resetPassword,
            changePassword: changePassword,
        };
    }
    angular.module('playalong.services')
        .factory('Auth', Auth)
        .factory('login', login)
        .service('PlyFirebase', PlyFirebase);
})();
//# sourceMappingURL=auth.js.map