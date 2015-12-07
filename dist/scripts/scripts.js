"use strict";angular.module("playalong.services",["firebase"]),angular.module("playalong.services").controller("MainCtrl",["$scope","config","$http","chords","login","user",function(a,b,c,d,e,f){a.login=e,a.chordRef=null,a.test="ltr",a.addChord=function(){c.get(b.paths.mocks.hebrewChord).success(function(b){d.addChord(b).then(function(b){a.chordRef=b,a.chordRef.$bindTo(a,"newChord").then(function(){console.log("binded!")})})})},a.increaseChordHitCount=function(a){d.increaseChordHitCount(a.chordKey)},a.addToFavorites=function(){var a=e.getUser(),b={userKey:a.userKey,isAddFlag:!0,chordObj:{chordKey:"-JxLKLUR8irZN0TA__XK",artist:"Asaf Avidan",title:"Gold Shadow"}};f.addRemoveFavorites(b).then(function(a){console.log(a),console.log("added to favorites")})},a.getChordById=function(){var b=d.getChordById("-JxLKLUR8irZN0TA__XK");b&&b.$bindTo(a,"newChord")},a.searchBy="artist",a.searchChord=function(b,c){d.searchChordsBy(b,c).then(function(b){a.resultJson=b})["catch"](function(b){a.resultJson=b})},a.loginSocial=function(a){e.loginSocial(a).then(function(a){console.log(a)})},a.loginEmail=function(a,b){e.loginEmail(a,b).then(function(a){console.log(a)})["catch"](function(a){console.log(a)})},a.getTopChords=function(b){d.getTopChords(b).then(function(b){a.topChords=b})["catch"](function(a){console.error(a)})},a.rateChord=function(){d.rateChord("-JxLKLUR8irZN0TA__XK",1).then(function(){console.log("all good")})},a.getFavorites=function(){f.getFavorites("-K4q5OByh18b-71C6Ju6").then(function(b){a.favorites=b})["catch"](function(a){console.warn(a.message)})}}]),angular.module("playalong.services").constant("config",function(){var a={env:PLY_CONFIG.env,paths:{firebaseDev:"https://playalong.firebaseio.com/",firebaseProd:"https://playalong-prod.firebaseio.com/",mocks:{singleChord:"mocks/singleChord.json",hebrewChord:"mocks/hebrewChord.json"}}};return a.paths.firebase="dev"===a.env?a.paths.firebaseDev:a.paths.firebaseProd,a}()),angular.module("playalong.services").factory("chords",["config","$firebaseArray","$q","$firebaseObject",function(a,b,c,d){function e(a){var b=new Firebase(l+"/"+a);b.orderByChild("hitCount").once("value",function(a){b.child("hitCount").set((a.val().hitCount||0)+1)})}function f(a){var b=[];return angular.forEach(a,function(a,c){a.approved&&(a.chordKey=c,b.push(a))}),b}function g(a){a.hitCount=0,a.rating=1,a.countRating=0;var b=m.$add(a).then(function(a){return d(a)});return b}function h(a){return d(l.child(a))}function i(a,b){var d=c.defer();return l.orderByChild(a).startAt(b).endAt(b+"~").once("value",function(c){var e=c.val();e||d.reject("No results for query "+b+", search by "+a);var g=f(e);d.resolve(g)}),d.promise}function j(a){var b=c.defer();return l.orderByChild("hitCount").limitToLast(a).on("value",function(a){var c=a.val();c||b.reject("No results for query getTopChords");var d=f(c);b.resolve(d)}),b.promise}function k(a,b){var d=c.defer();(1>b||b>5)&&d.reject("Rating value should be between 1 - 5");var e=new Firebase(l+"/"+a);return e.once("value",function(a){var c=a.val().countRating||1,f=a.val().rating||1;return f=(f*c+1*b)/(c+1),f=Math.round(f),f=Math.min(f,5),e.child("countRating").set(c+1),e.child("rating").set(f),d.resolve()},function(a){d.reject(a)}),d.promise}var l=new Firebase(a.paths.firebase+"chords"),m=b(l);return{addChord:g,getChordById:h,searchChordsBy:i,increaseChordHitCount:e,getTopChords:j,rateChord:k}}]),angular.module("playalong.services").factory("Auth",["$firebaseAuth","config",function(a,b){var c=new Firebase(b.paths.firebase+"/users");return a(c)}]).factory("login",["$q","Auth","config","$firebaseArray","customerIoHelper","$rootScope",function(a,b,c,d,e,f){var g,h;b.$onAuth(function(a){if(null===a)g=null,h=null;else{h=a;var b=new Firebase(c.paths.firebase+"/users");b.orderByChild("uid").equalTo(a.uid).on("value",function(c){var h=c.val();if(h)g=h[Object.keys(h)[0]],g.userKey=Object.keys(h)[0];else{var i,j,k;switch(a.auth.provider){case"facebook":i=a.facebook.email,j=a.facebook.cachedUserProfile.first_name,k=a.facebook.cachedUserProfile.last_name;break;case"password":i=a.password.email,j="",k="";break;case"google":i=a.google.email,j=a.google.cachedUserProfile.given_name,k=a.google.cachedUserProfile.family_name}var l=d(b);g={uid:a.uid,email:i,firstName:j,lastName:k,userType:"normal",creationDate:(new Date).getTime()/1e3},l.$add(g)}f.$broadcast("plyUserLoggedIn"),e.identifyUser(g)})}});var i=function(b,d){var e=a.defer(),f=new Firebase(c.paths.firebase);return f.authWithPassword({email:b,password:d},function(a,b){a?(console.log("Error creating user:",a),e.reject(a)):e.resolve(b)}),e.promise},j=function(c){var d=a.defer(),e={scope:"email"};return b.$authWithOAuthPopup(c,e).then(function(a){d.resolve(a)})["catch"](function(a){"TRANSPORT_UNAVAILABLE"===a.code?b.$authWithOAuthRedirect(c).then(function(a){d.resolve(a)}):(console.log(a),d.reject(a))}),d.promise},k=function(){return g},l=function(){return!!g},m=function(){b.$unauth()},n=function(){return h},o=function(){return this.getFirstName()+" "+this.getLastName()},p=function(){return g?g.lastName:""},q=function(){return g?g.firstName:""},r=function(){return this.getUser()&&this.getUser().userType&&(-1!==this.getUser().userType.indexOf("superuser")||-1!==this.getUser().userType.indexOf("admin"))};return{loginSocial:j,loginEmail:i,getUser:k,getAuth:n,isLoggedIn:l,logout:m,getFirstName:q,getLastName:p,getFullName:o,isSuperUser:r}}]),angular.module("playalong.services").service("user",["config","plyFirebase","$q","login",function(a,b,c,d){var e=function(a){var e=c.defer();d.isLoggedIn()||e.reject({message:"user is not logged in"}),a=a||{},a.chordObj=a.chordObj||{};var f="users/"+a.userKey+"/favorites/";return a.isAddFlag?b.insert(f,{chordKey:a.chordObj.chordKey,artist:a.chordObj.artist,title:a.chordObj.title,creationDate:new Date}).then(function(a){e.resolve(a)}):b.removeWithQuery(f,"chordKey","equalTo",a.chordObj.chordKey).then(function(a){e.resolve(a)}),e.promise},f=function(a){var d=c.defer();return b.getNode({relPath:"users/"+a+"/favorites",isOnce:!0}).then(function(a){console.log("msg"),a?d.resolve(a):d.reject({message:"No favorites found"})}),d.promise},g=function(a,d){var e=c.defer(),f="users/"+a+"/favorites";return b.selectSimpleQuery(f,"chordKey","equalTo",d).then(function(a){e.resolve(!!a)}),e.promise};return{addRemoveFavorites:e,getFavorites:f,isChordFavorite:g}}]),angular.module("playalong.services").service("customerIoHelper",[function(){var a=function(a){return a&&a.uid&&window._cio?(window._cio.identify({id:a.uid,email:a.email||"",created_at:a.creationDate||new Date,firstName:a.firstName||"",lastName:a.lastName||"",userType:a.userType||"normal"}),!0):!1};return{identifyUser:a}}]),angular.module("playalong.services").directive("autoDirection",["$interval",function(a){return{restrict:"A",link:function(a,b,c){function d(a){var b="A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜﷾-﹯﻽-￿",c="֑-߿יִ-﷽ﹰ-ﻼ",d=new RegExp("^[^"+b+"]*["+c+"]");return d.test(a)}function e(a){if(32!==a.charCode){var c=d(String.fromCharCode(a.charCode)),e=c?"RTL":"LTR";b.css("direction",e)}}if(c.autoDirectionScopeVar&&a[c.autoDirectionScopeVar]&&a[c.autoDirectionScopeVar].toLowerCase&&("rtl"===a[c.autoDirectionScopeVar].toLowerCase()||"ltr"===a[c.autoDirectionScopeVar].toLowerCase()))b.css("direction",a[c.autoDirectionScopeVar].toLowerCase());else{b.on("keypress",e)[0]}}}}]),angular.module("playalong.services").service("plyFirebase",["config","$q",function(a,b){var c=function(b){return b=b||"",new Firebase(a.paths.firebase+b)},d=function(a){var d=b.defer();a=a||{};var e=c(a.relPath),f=a.isOnce?"once":"on";return e[f]("value",function(a){d.resolve(a.val())},function(){d.reject({message:"Node does not exist"})}),d.promise},e=function(a,d,e,f,g){var h=b.defer(),i=c(a);return i.orderByChild(d)[e](f).once("value",function(a){var b=g?a:a.val();console.log(b),h.resolve(b)}),h.promise},f=function(a,c,d,f){var g=b.defer();return e(a,c,d,f,!0).then(function(a){a&&a.ref()?(a.ref().remove(),g.resolve({message:"success"})):g.reject({message:"ref does not exist"})}),g.promise},g=function(a,d){var e=b.defer(),f=c(a);return f&&f.push?f.push(d,function(){e.resolve({message:"success"})}):setTimeout(e.reject,10),e.promise};return{getRef:c,getNode:d,selectSimpleQuery:e,removeWithQuery:f,insert:g}}]),angular.module("playalong.services").run(["$templateCache",function(a){a.put("views/main.html",'<div class="container"> <div class="form-group"> <button class="btn btn-md" ng-click="addChord()">Add Chord</button> </div> <pre>{{newChord | json}}</pre> <textarea ng-model="newChord.artist" auto-direction auto-direction-scope-var="test"></textarea> <div class="form-group"> <label>Chord id</label> <div class="form-control"> <input type="text" ng-model="chordId"> </div> </div> <div class="form-group"> <button class="btn btn-defaults" ng-click="getChordById()">Search chord by id</button> </div> <div class="form-group"> <label for="searchBy">Search By</label> <select id="searchBy" ng-model="searchBy" id="" class="form-control"> <option value="artist" selected>artist</option> <option value="title">title</option> </select> </div> <div class="form-group"> <label for="searchText">Text</label> <input class="form-control" type="text" ng-model="searchText"> </div> <button class="form-control btn btn-primary" ng-click="searchChord(searchBy,searchText)">Search Chord</button> <div class="container"> <pre ng-click="increaseChordHitCount(resultJson[0])">\n    {{resultJson | json}}\n  </pre> </div> <div class="form-group"> Hello {{login.getFullName()}} <div class="control-label">Login Via</div> <div class="btn-group"> <button class="btn btn-success" ng-click="loginSocial(\'facebook\')">Facebook</button> <button class="btn btn-warning" ng-click="loginSocial(\'google\')">Google</button> </div> </div> <div class="form-group"> <h4>Or by Email & Password</h4> <div class="control-label">Email</div> <input class="form-control" ng-model="email" type="email" placeholder="email..."> <div class="control-label">Password</div> <input class="form-control" ng-model="password" type="password" placeholder="password..."> </div> <button class="btn btn-primary pull-right" ng-click="loginEmail(email,password)">Go</button> <br><br> <div class="form-group"> <div class="control-label">Add to Favorites</div> <p>Check the checkbox if you want to add, otherwise it\'s remove</p> <div class="form-control"> <input type="checkbox" ng-model="isAddFlag"> </div> <div class="btn btn-primary" ng-click="addToFavorites()">Favorite Test</div> </div> <div class="form-group"> <div class="btn btn-default" ng-click="getFavorites()">Get Favorites</div> <div ng-bind="favorites"></div> </div> <br><br> <div class="form-group"> <div class="control-label">Get Top Chords</div> <div class="btn btn-primary" ng-click="getTopChords(2)">Get Them!</div> <div ng-repeat="chord in topChords track by $index">{{chord}}</div> </div> <br><br> <div class="form-group"> <div class="control-label">Rate Chord</div> <button class="btn btn-primary" ng-click="rateChord()">Click to rate</button> </div> </div>')}]);