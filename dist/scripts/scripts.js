"use strict";angular.module("playalong.services",["firebase","ngSanitize","pascalprecht.translate","LocalStorageModule"]),angular.module("playalong.services").config(["$translateProvider","config",function(a,b){var c=PLY_CONFIG.defaultLocale||"en";a.addInterpolation("$translateMessageFormatInterpolation").useSanitizeValueStrategy("sanitize").useStaticFilesLoader({prefix:b.paths.firebaseProd+"i18n/",suffix:".json"}).preferredLanguage(c)}]).run(["$location","$translate","PlyStorage",function(a,b,c){var d=c.get("locale");if(d)b.use(d);else{var e=a.search().locale;("he"===e||"en"===e)&&b.use(e)}}]).run(["$rootScope","$translate",function(a,b){var c="he"===b.proposedLanguage()?"rtl":"ltr",d=b.use()||b.proposedLanguage();a.app={dir:c,locale:d}}]),function(){angular.module("playalong.services").config(["$sceProvider",function(a){a.enabled(!1)}]).controller("MainCtrl",["$scope","config","$http","chords","login","user","transposer",function(a,b,c,d,e,f,g){a.login=e,a.transposer=g,a.chordRef=null,a.test="ltr",a.addChord=function(){c.get(b.paths.mocks.hebrewChord).success(function(b){d.addChord(b).then(function(b){a.chordRef=b,a.chordRef.$bindTo(a,"newChord").then(function(){console.log("binded!")})})})},a.increaseChordHitCount=function(a){d.increaseChordHitCount(a.chordKey)},a.isAddFlag=!1,a.addToFavorites=function(){var b=e.getUser(),c={userKey:b.userKey,isAddFlag:a.isAddFlag,chordObj:{chordKey:"-JxLKLUR8irZN0TA__XK",artist:"Asaf Avidan",title:"Gold Shadow"}};f.addRemoveFavorites(c).then(function(a){console.log(a),console.log("added to favorites")})},a.getChordById=function(){d.getChordById({chordId:"-JxLKLUR8irZN0TA__XK",isFirebaseObject:!1}).then(function(b){a.newChord=b})["catch"](function(a){return console.error(a)})},a.getChordById(),a.searchBy="artist",a.searchChord=function(b,c){d.searchChordsBy(b,c).then(function(b){a.resultJson=b})["catch"](function(b){a.resultJson=b})},a.loginSocial=function(a){e.loginSocial(a).then(function(a){console.log(a)})},a.loginEmail=function(a,b){e.loginEmail(a,b).then(function(a){console.log(a)})["catch"](function(a){console.log(a)})},setTimeout(function(){var a=angular.element(document.querySelector(".transposeArea .chord"));angular.forEach(a,function(a){var b=angular.element(a).text();console.log(b);var c=g.transpose(b,3);console.log(c),angular.element(a).text(c)})},3e3),a.rateChord=function(){d.rateChord("-JxLKLUR8irZN0TA__XK",1).then(function(){console.log("all good")})},a.getFavorites=function(){f.getFavorites("-K4q5OByh18b-71C6Ju6").then(function(b){a.favorites=b})["catch"](function(a){console.warn(a.message)})},a.getTopChords=function(){d.getTopChords(2).then(function(a){return console.log("top chords: ",a)})}}])}(),angular.module("playalong.services").constant("config",function(){var a={env:PLY_CONFIG.env,paths:{firebaseDev:"https://playalong.firebaseio.com/",firebaseProd:"https://playalong-prod.firebaseio.com/",firebase:void 0,mocks:{singleChord:"mocks/singleChord.json",hebrewChord:"mocks/hebrewChord.json"}}};return a.paths.firebase="dev"===a.env?a.paths.firebaseDev:a.paths.firebaseProd,a}()),function(){function a(a){function b(a,b,c,d,e){return new Promise(function(f,g){var i=h(a);i.orderByChild(b)[c](d).once("value").then(function(a){var b=e?a:a.val();console.log(b),f(b)})})}function c(a,c,d,e){return new Promise(function(f,g){b(a,c,d,e,!0).then(function(a){a.hasChildren()&&a.forEach(function(a){a.ref().remove()}),f({message:"success"})})["catch"](function(a){return g(a)})})}function d(b,c){return new Promise(function(d,e){var f=h(b);f&&f.push?f.push(c).then(function(b){d(a(b))}):setTimeout(e,10)})}function e(b){return new Promise(function(c,d){b=b||{};var e=h(b.relPath);b.isOnce?"once":"on";e.once("value").then(function(d){c(b.isFirebaseObject?a(d.ref):d.val())})["catch"](function(a){d({message:"Node does not exist",error:a})})})}function f(){i.signOut()}var g;g="dev"===PLY_CONFIG.env?{apiKey:"AIzaSyApdtKEld9C-Hbkr62_o4tOPeZl_qiFfTY",authDomain:"playalong.firebaseapp.com",databaseURL:"https://playalong.firebaseio.com",storageBucket:"project-7489461719706903474.appspot.com"}:{apiKey:"AIzaSyAxl5nYfqR_RQPKD0QI_94PWBhpu0C0Q3M",authDomain:"playalong-prod.firebaseapp.com",databaseURL:"https://playalong-prod.firebaseio.com",storageBucket:"playalong-prod.appspot.com"},firebase.initializeApp(g);var h=function(a){return firebase.database().ref(a)},i=firebase.auth();return{auth:i,googleProvider:new firebase.auth.GoogleAuthProvider,facebookProvider:new firebase.auth.FacebookAuthProvider,getRef:h,insert:d,selectSimpleQuery:b,removeWithQuery:c,signOut:f,getNode:e}}a.$inject=["$firebaseObject"],angular.module("playalong.services").service("PlyFirebase",a)}(),function(){function a(a,b,c,d){function e(a){return new Promise(function(b,c){var d=l.child(a);d.orderByChild("hitCount").once("value").then(function(a){var c=a.val().hitCount||0;d.update({hitCount:c+1}),b()})["catch"](function(a){return c(a)})})}function f(a){var b=[];return angular.forEach(a,function(a,c){a.approved&&(a.chordKey=c,b.push(a))}),b}function g(a){return new Promise(function(b,d){a.hitCount=0,a.rating=1,a.countRating=0,c.insert("chords",a).then(function(a){return b(a)})["catch"](function(a){return d(a)})})}function h(a){return c.getNode({relPath:"chords/"+a.chordId,isOnce:!0,isFirebaseObject:a.isFirebaseObject})}function i(a,b){return new Promise(function(c,d){l.orderByChild(a).startAt(b).endAt(b+"~").once("value").then(function(e){var g=e.val();g||d("No results for query "+b+" searching by "+a);var h=f(g);c(h)})})}function j(a){return new Promise(function(b,c){l.orderByChild("hitCount").limitToLast(a).on("value",function(a){var d=a.val();d||c("No results for query getTopChords");var e=f(d);b(e)})})}function k(a,b){return new Promise(function(d,e){(1>b||b>5)&&e("Rating value should be between 1 - 5");var f=c.getRef("chords/"+a);f.once("value").then(function(a){var c=a.val().countRating||1,e=a.val().rating||1;return e=(e*c+1*b)/(c+1),e=Math.round(e),e=Math.min(e,5),f.child("countRating").set(c+1),f.child("rating").set(e),d()})["catch"](function(a){return e(a)})})}var l=c.getRef("chords");return{addChord:g,getChordById:h,searchChordsBy:i,increaseChordHitCount:e,getTopChords:j,rateChord:k}}a.$inject=["config","$q","PlyFirebase","$firebaseObject"],angular.module("playalong.services").factory("chords",a)}(),function(){function a(a,b,c,d,e){function f(){return o&&o.providerData&&o.providerData.length?o.providerData[0]:void 0}function g(a,b){return new Promise(function(c,d){e.auth.signInWithEmailAndPassword(a,b).then(function(a){return c(a)})["catch"](function(a){return d(a)})})}function h(a){return new Promise(function(b,c){var d;switch(a){case"facebook":d=e.facebookProvider;break;case"google":d=e.googleProvider;break;default:d=e.googleProvider}d.addScope("email"),e.auth.signInWithPopup(d).then(function(a){n=a.user,b(a)})["catch"](function(a){return c(a)})})}function i(){e.signOut().then(function(){return d.$broadcast("plyUserLoggedOut")})}function j(){return p()&&p().userType&&(-1!==this.getUser().userType.indexOf("superuser")||-1!==this.getUser().userType.indexOf("admin"))}function k(a,b){return new Promise(function(c,d){e.auth.createUserWithEmailAndPassword(a,b).then(function(a){return c(a)})["catch"](function(a){return d(a)})})}function l(a){return new Promise(function(b,c){e.auth.sendPasswordResetEmail(a).then(function(){console.log("Reset password sent to "+a),b()})["catch"](function(a){return c(a)})})}function m(a,c,d){return new Promise(function(e,f){var g=new Firebase(b.paths.firebase);g.changePassword({email:a,oldPassword:c,newPassword:d},function(a){null===a?(console.log("Password Changed"),e()):(console.log("Error changing password: ",a),f(a))})})}var n,o;e.auth.onAuthStateChanged(function(a){if(null===a)n=null,o=null;else{o=a;var b=e.getRef("users");b.orderByChild("uid").equalTo(a.uid).on("value",function(e){var g=e.val();if(g)n=g[Object.keys(g)[0]],n.userKey=Object.keys(g)[0];else{var h=void 0,i=void 0,j=void 0,k=void 0,l=f();switch(l.providerId){case"google.com":case"facebook.com":h=l.email,k=l.displayName.split(" "),i=k[0],j=k[1];break;case"password":h=l.email,i="",j=""}n={uid:a.uid,email:h,firstName:i,lastName:j,userType:"normal",creationDate:(new Date).getTime()/1e3},b.push(n)}d.$broadcast("plyUserLoggedIn"),c.identifyUser(n),window.mixpanel&&(window.mixpanel.identify(n.uid),window.mixpanel.people.set({$email:n.email,$created:n.creationDate||new Date,$last_login:new Date,firstName:n.firstName||"",lastName:n.lastName||"",userType:n.userType||"normal"}),window.mixpanel.track("ply_user_login"))})}});var p=function(){return n},q=function(){return!!n},r=function(){return o},s=function(){return u()+" "+t()},t=function(){return n?n.lastName:""},u=function(){return n?n.firstName:""};return{loginSocial:h,loginEmail:g,getUser:p,getAuth:r,isLoggedIn:q,logout:i,getFirstName:u,getLastName:t,getFullName:s,isSuperUser:j,createUser:k,resetPassword:l,changePassword:m}}a.$inject=["$q","config","customerIoHelper","$rootScope","PlyFirebase"],angular.module("playalong.services").factory("login",a)}(),function(){angular.module("playalong.services").service("user",["config","PlyFirebase","$q","login",function(a,b,c,d){function e(a){return new Promise(function(c,e){d.isLoggedIn()||e({message:"user is not logged in"}),a=a||{},a.chordObj=a.chordObj||{};var f="users/"+a.userKey+"/favorites/";a.isAddFlag?b.insert(f,{chordKey:a.chordObj.chordKey,artist:a.chordObj.artist,title:a.chordObj.title,creationDate:new Date}).then(function(a){c(a)}):b.removeWithQuery(f,"chordKey","equalTo",a.chordObj.chordKey).then(function(a){c(a)})})}function f(a){return new Promise(function(c,d){b.getNode({relPath:"users/"+a+"/favorites",isOnce:!0}).then(function(a){a?c(a):d({message:"No favorites found"})})})}function g(a,c){return new Promise(function(d,e){var f="users/"+a+"/favorites";b.selectSimpleQuery(f,"chordKey","equalTo",c).then(function(a){d(!!a)})})}return{addRemoveFavorites:e,getFavorites:f,isChordFavorite:g}}])}(),function(){angular.module("playalong.services").service("customerIoHelper",[function(){var a=function(a){return a&&a.uid&&window._cio?(window._cio.identify({id:a.uid,email:a.email||"",created_at:a.creationDate||new Date,firstName:a.firstName||"",lastName:a.lastName||"",userType:a.userType||"normal"}),!0):!1};return{identifyUser:a}}])}(),angular.module("playalong.services").directive("autoDirection",["$interval",function(a){return{restrict:"A",link:function(a,b,c){function d(a){var b="A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜﷾-﹯﻽-￿",c="֑-߿יִ-﷽ﹰ-ﻼ",d=new RegExp("^[^"+b+"]*["+c+"]");return d.test(a)}function e(a){if(32!==a.charCode){var c=d(String.fromCharCode(a.charCode)),e=c?"RTL":"LTR";b.css("direction",e)}}if(c.autoDirectionScopeVar&&a[c.autoDirectionScopeVar]&&a[c.autoDirectionScopeVar].toLowerCase&&("rtl"===a[c.autoDirectionScopeVar].toLowerCase()||"ltr"===a[c.autoDirectionScopeVar].toLowerCase()))b.css("direction",a[c.autoDirectionScopeVar].toLowerCase());else{b.on("keypress",e)[0]}}}}]),function(){angular.module("playalong.services").constant("ChordTranposeMap",{F:{prev:"E",next:"F#"},"F#":{prev:"F",next:"G"},G:{prev:"F#",next:"G#"},"G#":{prev:"G",next:"A"},A:{prev:"G#",next:"Bb"},Bb:{prev:"A",next:"B"},B:{prev:"Bb",next:"C"},C:{prev:"B",next:"C#"},"C#":{prev:"C",next:"D"},D:{prev:"C#",next:"Eb"},Eb:{prev:"D",next:"E"},E:{prev:"Eb",next:"F"}}).constant("EqualChordsMap",{"A#":"Bb",Ab:"G#",Db:"C#","D#":"Eb"}).service("transposer",["ChordTranposeMap","EqualChordsMap","RegexStore",function(a,b,c){var d=function(a){return b[a]||a},e=function(b,e){var f=angular.copy(b),g=c.get("basicChord");if(b=b.match(g),!b||!e||"number"!=typeof e)return null;var h=0>e?"prev":"next";e=Math.abs(e);for(var i=0;e>i;i++){if(b=d(b),!a[b]||!a[b][h])return null;b=a[b][h]}return f.replace(c.get("basicChord"),b)};return{transpose:e,getEqualChord:d}}])}(),function(){angular.module("playalong.services").service("RegexStore",function(){var a={mobile:/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i,hebrew:/[\u0590-\u05e8\u05e9-\u05ff]/g,chord:/($|\b|<div>)((?:G,C,D|A,B,C|E,C,D)|(?:[ABCDEFG](?:#|b)?)(?:\/[ABCDEFG]b)?(?:(?:(?:maj|min|sus|add|aug|dim)(?:\d{0,2}(?:#\d{1,2}|sus\d)?)?)|(?:m\d{0,2}(?:(?:maj|add|#)\d{0,2})?)|(?:-?\d{0,2}(?:\([^)]*\)|#\d{1,2})?))?)(^|\s|&nbsp;*<\/div>|<div>|\b)/gm,basicChord:/^[A-G][b\#]?/},b=function(b){return a[b]};return{get:b}})}(),function(){var a=function(){function a(a){this.localStorageService=a}return a.$inject=["localStorageService"],a.prototype.get=function(a){return this.localStorageService.get(a)},a.prototype.set=function(a,b){this.localStorageService.set(a,b)},a}();angular.module("playalong.services").service("PlyStorage",a)}(),angular.module("playalong.services").run(["$templateCache",function(a){a.put("views/main.html",'<div class="container"> <div class="form-group"> <button class="btn btn-md" ng-click="addChord()">Add Chord</button> </div> <h3 translate="home.SEARCH_TITLE"></h3> <pre>{{newChord | json}}</pre> <div class="form-group"> <div class="transposeArea" ng-bind-html="newChord.content"></div> <button class="btn" ng-click="transposeTheText();">Transpose Text</button> </div> <textarea ng-model="newChord.artist" auto-direction auto-direction-scope-var="test"></textarea> <div class="form-group"> <label>Chord id</label> <div class="form-control"> <input type="text" ng-model="chordId"> </div> </div> <div class="form-group"> <button class="btn btn-defaults" ng-click="getChordById()">Search chord by id</button> </div> <div class="form-group"> <label for="searchBy">Search By</label> <select id="searchBy" ng-model="searchBy" id="" class="form-control"> <option value="artist" selected>artist</option> <option value="title">title</option> </select> </div> <div class="form-group"> <label for="searchText">Text</label> <input class="form-control" type="text" ng-model="searchText"> </div> <button class="form-control btn btn-primary" ng-click="searchChord(searchBy,searchText)">Search Chord</button> <div class="container"> <pre ng-click="increaseChordHitCount(resultJson[0])">\n    {{resultJson | json}}\n  </pre> </div> <div class="form-group"> Hello {{login.getFullName()}} <div class="control-label">Login Via</div> <div class="btn-group"> <button class="btn btn-success" ng-click="loginSocial(\'facebook\')">Facebook</button> <button class="btn btn-warning" ng-click="loginSocial(\'google\')">Google</button> </div> </div> <div class="form-group"> <h4>Or by Email & Password</h4> <div class="control-label">Email</div> <input class="form-control" ng-model="email" type="email" placeholder="email..."> <div class="control-label">Password</div> <input class="form-control" ng-model="password" type="password" placeholder="password..."> </div> <button class="btn btn-primary pull-right" ng-click="loginEmail(email,password)">Login</button> <button class="btn btn-primary pull-right" ng-click="login.createUser(email,password)">Sign Up</button> <button class="btn btn-primary pull-right" ng-click="login.resetPassword(email)">Reset Password</button> <br><br> <div class="form-group"> <div class="control-label">Add to Favorites</div> <p>Check the checkbox if you want to add, otherwise it\'s remove</p> <div class="form-control"> <input type="checkbox" ng-model="isAddFlag"> </div> <div class="btn btn-primary" ng-click="addToFavorites()">Favorite Test</div> </div> <div class="form-group"> <div class="btn btn-default" ng-click="getFavorites()">Get Favorites</div> <pre ng-bind="favorites | json"></pre> </div> <br><br> <div class="form-group"> <div class="control-label">Get Top Chords</div> <div class="btn btn-primary" ng-click="getTopChords(2)">Get Them!</div> <div ng-repeat="chord in topChords track by $index">{{chord}}</div> </div> <br><br> <div class="form-group"> <div class="control-label">Rate Chord</div> <button class="btn btn-primary" ng-click="rateChord()">Click to rate</button> </div> <br><br> </div>')}]);