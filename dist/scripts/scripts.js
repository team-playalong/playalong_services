"use strict";angular.module("playalong.services",["firebase"]),angular.module("playalong.services").controller("MainCtrl",["$scope","config","$http","chords","login","user",function(a,b,c,d,e,f){a.chordRef=null,a.addChord=function(){c.get(b.paths.mocks.hebrewChord).success(function(b){d.addChord(b).then(function(b){a.chordRef=b,a.chordRef.$bindTo(a,"newChord").then(function(){console.log("binded!")})})})},a.increaseChordHitCount=function(a){d.increaseChordHitCount(a.chordKey)},a.addToFavorites=function(){f.addRemoveFavorites(1,1,a.isAddFlag).then(function(){console.log("allGood")})},a.getChordById=function(){d.getChordById(1).then(function(b){a.resultJson=b})["catch"](function(b){a.resultJson=b})},a.searchBy="artist",a.searchChord=function(b,c){d.searchChordsBy(b,c).then(function(b){a.resultJson=b})["catch"](function(b){a.resultJson=b})},a.loginSocial=function(a){e.loginSocial(a).then(function(a){console.log(a)})},a.loginEmail=function(a,b){e.loginEmail(a,b).then(function(a){console.log(a)})["catch"](function(a){console.log(a)})},a.getTopChords=function(b){d.getTopChords(b).then(function(b){a.topChords=b})["catch"](function(a){console.error(a)})}}]),angular.module("playalong.services").constant("config",function(){var a={env:PLY_CONFIG.env,envToDbMap:{dev:"dev/",prod:"prod/"},paths:{firebase:"https://playalong.firebaseio.com/",mocks:{singleChord:"mocks/singleChord.json",hebrewChord:"mocks/hebrewChord.json"}}},b=a.envToDbMap&&a.envToDbMap[a.env]?a.envToDbMap[a.env]:"dev";return a.paths.firebase+=b,a}()),angular.module("playalong.services").factory("chords",["config","$firebaseArray","$q","$firebaseObject",function(a,b,c,d){function e(a){console.log(a);var b=new Firebase(j+"/"+a);b.orderByChild("hitCount").once("value",function(a){b.child("hitCount").set((a.val().hitCount||0)+1)})}function f(a){a.hitCount=0;var b=k.$add(a).then(function(a){return d(a)});return b}function g(a){var b=c.defer();return j.orderByChild("id").equalTo(a).on("value",function(c){var d=c.val();d||b.reject("No Chord with Id "+a);var e;angular.forEach(d,function(a){e=a}),b.resolve(e)}),b.promise}function h(a,b){var d=c.defer();return j.orderByChild(a).startAt(b).endAt(b+"~").on("value",function(c){var e=c.val();e||d.reject("No results for query "+b+", search by "+a);var f=[];angular.forEach(e,function(a,b){a.chordKey=b,f.push(a)}),d.resolve(f)}),d.promise}function i(a){var b=c.defer();return j.orderByChild("hitCount").limitToLast(a).on("value",function(a){var c=a.val();c||b.reject("No results for query getTopChords");var d=[];angular.forEach(c,function(a,b){a.chordKey=b,d.push(a)}),b.resolve(d)}),b.promise}var j=new Firebase(a.paths.firebase+"chords"),k=b(j);return{addChord:f,getChordById:g,searchChordsBy:h,increaseChordHitCount:e,getTopChords:i}}]),angular.module("playalong.services").factory("Auth",["$firebaseAuth","config",function(a,b){var c=new Firebase(b.paths.firebase+"/users");return a(c)}]).factory("login",["$q","Auth","config","$firebaseArray",function(a,b,c,d){b.$onAuth(function(a){if(null===a)console.log("Not logged in yet");else{console.log("Logged in as",a.uid);var b=new Firebase(c.paths.firebase+"/users");b.orderByChild("uid").equalTo(a.uid).on("value",function(c){var e=c.val();if(!e){console.log("user "+a.uid+" doesnt exist");var f,g,h;switch(a.auth.provider){case"facebook":f=a.facebook.email,g=a.facebook.cachedUserProfile.first_name,h=a.facebook.cachedUserProfile.last_name;break;case"password":f=a.password.email,g="",h="";break;case"google":f=a.google.email,g=a.google.cachedUserProfile.given_name,h=a.google.cachedUserProfile.family_name}var i=d(b);i.$add({uid:a.uid,email:f,firstName:g,lastName:h})}}),console.log(a)}});var e=function(b,d){var e=a.defer(),f=new Firebase(c.paths.firebase);return f.authWithPassword({email:b,password:d},function(a,b){a?(console.log("Error creating user:",a),e.reject(a)):(console.log("Successfully created user account with uid:",b.uid),e.resolve(b))}),e.promise},f=function(c){var d=a.defer(),e={scope:"email"};return b.$authWithOAuthRedirect(c,e).then(function(a){console.log(a),d.resolve(a)})["catch"](function(a){"TRANSPORT_UNAVAILABLE"===a.code?b.$authWithOAuthPopup(c).then(function(a){console.log(a),d.resolve(a)}):(console.log(a),d.reject(a))}),d.promise};return{loginSocial:f,loginEmail:e}}]),angular.module("playalong.services").service("user",["config","$firebaseArray",function(a,b){function c(a,b,c){console.log(c),console.log(b);var e=new Firebase(d+"/"+a+"/favorites/"+b);e.orderByChild("isFavorite").once("value",function(a){console.log(a.val())})}var d=new Firebase(a.paths.firebase+"users"),e=b(d);return console.log(e),{addRemoveFavorites:c}}]),angular.module("playalong.services").run(["$templateCache",function(a){a.put("views/main.html",'<div class="container"> <div class="form-group"> <button class="btn btn-md" ng-click="addChord()">Add Chord</button> </div> <pre>{{newChord | json}}</pre> <textarea ng-model="newChord.artist"></textarea> <div class="form-group"> <label>Chord id</label> <div class="form-control"> <input type="text" ng-model="chordId"> </div> </div> <div class="form-group"> <button class="btn btn-defaults" ng-click="getChordById()">Search chord by id</button> </div> <div class="form-group"> <label for="searchBy">Search By</label> <select id="searchBy" ng-model="searchBy" id="" class="form-control"> <option value="artist" selected>artist</option> <option value="title">title</option> </select> </div> <div class="form-group"> <label for="searchText">Text</label> <input class="form-control" type="text" ng-model="searchText"> </div> <button class="form-control btn btn-primary" ng-click="searchChord(searchBy,searchText)">Search Chord</button> <div class="container"> <pre ng-click="increaseChordHitCount(resultJson[0])">\n    {{resultJson | json}}\n  </pre> </div> <div class="form-group"> <div class="control-label">Login Via</div> <div class="btn-group"> <button class="btn btn-success" ng-click="loginSocial(\'facebook\')">Facebook</button> <button class="btn btn-warning" ng-click="loginSocial(\'google\')">Google</button> </div> </div> <div class="form-group"> <h4>Or by Email & Password</h4> <div class="control-label">Email</div> <input class="form-control" ng-model="email" type="email" placeholder="email..."> <div class="control-label">Password</div> <input class="form-control" ng-model="password" type="password" placeholder="password..."> </div> <button class="btn btn-primary pull-right" ng-click="loginEmail(email,password)">Go</button> <br><br> <div class="form-group"> <div class="control-label">Add to Favorites</div> <p>Check the checkbox if you want to add, otherwise it\'s remove</p> <div class="form-control"> <input type="checkbox" ng-model="isAddFlag"> </div> <div class="btn btn-primary" ng-click="addToFavorites()">Favorite Test</div> </div> <br><br> <div class="form-group"> <div class="control-label">Get Top Chords</div> <div class="btn btn-primary" ng-click="getTopChords(2)">Get Them!</div> <div ng-repeat="chord in topChords track by $index">{{chord}}</div> </div> </div>')}]);