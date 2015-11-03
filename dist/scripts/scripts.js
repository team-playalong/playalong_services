"use strict";angular.module("playalong.services",["firebase"]),angular.module("playalong.services").controller("MainCtrl",["$scope","config","$http","chords","login","user",function(a,b,c,d,e,f){a.login=e,a.chordRef=null,a.addChord=function(){c.get(b.paths.mocks.hebrewChord).success(function(b){d.addChord(b).then(function(b){a.chordRef=b,a.chordRef.$bindTo(a,"newChord").then(function(){console.log("binded!")})})})},a.increaseChordHitCount=function(a){d.increaseChordHitCount(a.chordKey)},a.addToFavorites=function(){f.addRemoveFavorites(1,"-JxLKLUR8irZN0TA__XK",a.isAddFlag).then(function(){console.log("added to favorites")})},a.getChordById=function(){var b=d.getChordById("-JxLKLUR8irZN0TA__XK");b&&b.$bindTo(a,"newChord")},a.searchBy="artist",a.searchChord=function(b,c){d.searchChordsBy(b,c).then(function(b){a.resultJson=b})["catch"](function(b){a.resultJson=b})},a.loginSocial=function(a){e.loginSocial(a).then(function(a){console.log(a)})},a.loginEmail=function(a,b){e.loginEmail(a,b).then(function(a){console.log(a)})["catch"](function(a){console.log(a)})},a.getTopChords=function(b){d.getTopChords(b).then(function(b){a.topChords=b})["catch"](function(a){console.error(a)})},a.rateChord=function(){d.rateChord("-JxLKLUR8irZN0TA__XK",1).then(function(){console.log("all good")})}}]),angular.module("playalong.services").constant("config",function(){var a={env:PLY_CONFIG.env,paths:{firebaseDev:"https://playalong.firebaseio.com/",firebaseProd:"https://playalong-prod.firebaseio.com/",mocks:{singleChord:"mocks/singleChord.json",hebrewChord:"mocks/hebrewChord.json"}}};return a.paths.firebase="dev"===a.env?a.paths.firebaseDev:a.paths.firebaseProd,a}()),angular.module("playalong.services").factory("chords",["config","$firebaseArray","$q","$firebaseObject",function(a,b,c,d){function e(a){var b=new Firebase(l+"/"+a);b.orderByChild("hitCount").once("value",function(a){b.child("hitCount").set((a.val().hitCount||0)+1)})}function f(a){var b=[];return angular.forEach(a,function(a,c){a.approved&&(a.chordKey=c,b.push(a))}),b}function g(a){a.hitCount=0,a.rating=1,a.countRating=0;var b=m.$add(a).then(function(a){return d(a)});return b}function h(a){return d(l.child(a))}function i(a,b){var d=c.defer();return l.orderByChild(a).startAt(b).endAt(b+"~").once("value",function(c){var e=c.val();e||d.reject("No results for query "+b+", search by "+a);var g=f(e);d.resolve(g)}),d.promise}function j(a){var b=c.defer();return l.orderByChild("hitCount").limitToLast(a).on("value",function(a){var c=a.val();c||b.reject("No results for query getTopChords");var d=f(c);b.resolve(d)}),b.promise}function k(a,b){var d=c.defer();(1>b||b>5)&&d.reject("Rating value should be between 1 - 5");var e=new Firebase(l+"/"+a);return e.once("value",function(a){var c=a.val().countRating||1,f=a.val().rating||1;return f=(f*c+1*b)/(c+1),f=Math.round(f),f=Math.min(f,5),e.child("countRating").set(c+1),e.child("rating").set(f),d.resolve()},function(a){d.reject(a)}),d.promise}var l=new Firebase(a.paths.firebase+"chords"),m=b(l);return{addChord:g,getChordById:h,searchChordsBy:i,increaseChordHitCount:e,getTopChords:j,rateChord:k}}]),angular.module("playalong.services").factory("Auth",["$firebaseAuth","config",function(a,b){var c=new Firebase(b.paths.firebase+"/users");return a(c)}]).factory("login",["$q","Auth","config","$firebaseArray","customerIoHelper",function(a,b,c,d,e){var f,g;b.$onAuth(function(a){if(null===a)f=null,g=null;else{g=a;var b=new Firebase(c.paths.firebase+"/users");b.orderByChild("uid").equalTo(a.uid).on("value",function(c){var e=c.val();if(e)f=e[Object.keys(e)[0]];else{var g,h,i;switch(a.auth.provider){case"facebook":g=a.facebook.email,h=a.facebook.cachedUserProfile.first_name,i=a.facebook.cachedUserProfile.last_name;break;case"password":g=a.password.email,h="",i="";break;case"google":g=a.google.email,h=a.google.cachedUserProfile.given_name,i=a.google.cachedUserProfile.family_name}var j=d(b);f={uid:a.uid,email:g,firstName:h,lastName:i,userType:"normal",creationDate:(new Date).getTime()/1e3},j.$add(f)}})}e.identifyUser(f)});var h=function(b,d){var e=a.defer(),f=new Firebase(c.paths.firebase);return f.authWithPassword({email:b,password:d},function(a,b){a?(console.log("Error creating user:",a),e.reject(a)):e.resolve(b)}),e.promise},i=function(c){var d=a.defer(),e={scope:"email"};return b.$authWithOAuthPopup(c,e).then(function(a){d.resolve(a)})["catch"](function(a){"TRANSPORT_UNAVAILABLE"===a.code?b.$authWithOAuthRedirect(c).then(function(a){d.resolve(a)}):(console.log(a),d.reject(a))}),d.promise},j=function(){return f},k=function(){return!!f},l=function(){b.$unauth()},m=function(){return g},n=function(){return this.getFirstName()+" "+this.getLastName()},o=function(){return f?f.lastName:""},p=function(){return f?f.firstName:""},q=function(){return this.getUser()&&this.getUser().userType&&(-1!==this.getUser().userType.indexOf("superuser")||-1!==this.getUser().userType.indexOf("admin"))};return{loginSocial:i,loginEmail:h,getUser:j,getAuth:m,isLoggedIn:k,logout:l,getFirstName:p,getLastName:o,getFullName:n,isSuperUser:q}}]),angular.module("playalong.services").service("user",["config","$firebaseArray",function(a,b){function c(a,b,c){var e=new Firebase(d+"/"+a+"/favorites/"+b);e.orderByChild("isFavorite").once("value",function(a){})}var d=new Firebase(a.paths.firebase+"users");b(d);return{addRemoveFavorites:c}}]),angular.module("playalong.services").service("customerIoHelper",[function(){var a=function(a){return a&&a.uid&&window._cio?(window._cio.identify({id:a.uid,email:a.email||"",created_at:a.creationDate||new Date,firstName:a.firstName||"",lastName:a.lastName||"",userType:a.userType||"normal"}),!0):!1};return{identifyUser:a}}]),angular.module("playalong.services").directive("autoDirection",["$interval",function(a){return{restrict:"A",link:function(a,b,c){function d(a){var b="A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜﷾-﹯﻽-￿",c="֑-߿יִ-﷽ﹰ-ﻼ",d=new RegExp("^[^"+b+"]*["+c+"]");return d.test(a)}function e(a){32!==a.charCode&&setTimeout(function(){var c=d(String.fromCharCode(a.charCode)),e=c?"RTL":"LTR";b.css("direction",e)},0)}b.on("keypress",e)[0]}}}]),angular.module("playalong.services").run(["$templateCache",function(a){a.put("views/main.html",'<div class="container"> <div class="form-group"> <button class="btn btn-md" ng-click="addChord()">Add Chord</button> </div> <pre>{{newChord | json}}</pre> <textarea ng-model="newChord.artist" auto-direction></textarea> <div class="form-group"> <label>Chord id</label> <div class="form-control"> <input type="text" ng-model="chordId"> </div> </div> <div class="form-group"> <button class="btn btn-defaults" ng-click="getChordById()">Search chord by id</button> </div> <div class="form-group"> <label for="searchBy">Search By</label> <select id="searchBy" ng-model="searchBy" id="" class="form-control"> <option value="artist" selected>artist</option> <option value="title">title</option> </select> </div> <div class="form-group"> <label for="searchText">Text</label> <input class="form-control" type="text" ng-model="searchText"> </div> <button class="form-control btn btn-primary" ng-click="searchChord(searchBy,searchText)">Search Chord</button> <div class="container"> <pre ng-click="increaseChordHitCount(resultJson[0])">\n    {{resultJson | json}}\n  </pre> </div> <div class="form-group"> Hello {{login.getFullName()}} <div class="control-label">Login Via</div> <div class="btn-group"> <button class="btn btn-success" ng-click="loginSocial(\'facebook\')">Facebook</button> <button class="btn btn-warning" ng-click="loginSocial(\'google\')">Google</button> </div> </div> <div class="form-group"> <h4>Or by Email & Password</h4> <div class="control-label">Email</div> <input class="form-control" ng-model="email" type="email" placeholder="email..."> <div class="control-label">Password</div> <input class="form-control" ng-model="password" type="password" placeholder="password..."> </div> <button class="btn btn-primary pull-right" ng-click="loginEmail(email,password)">Go</button> <br><br> <div class="form-group"> <div class="control-label">Add to Favorites</div> <p>Check the checkbox if you want to add, otherwise it\'s remove</p> <div class="form-control"> <input type="checkbox" ng-model="isAddFlag"> </div> <div class="btn btn-primary" ng-click="addToFavorites()">Favorite Test</div> </div> <br><br> <div class="form-group"> <div class="control-label">Get Top Chords</div> <div class="btn btn-primary" ng-click="getTopChords(2)">Get Them!</div> <div ng-repeat="chord in topChords track by $index">{{chord}}</div> </div> <br><br> <div class="form-group"> <div class="control-label">Rate Chord</div> <button class="btn btn-primary" ng-click="rateChord()">Click to rate</button> </div> </div>')}]);