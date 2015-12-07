'use strict';

describe('Service: user', function () {

  // load the service's module
  beforeEach(module('playalong.services'));

  // instantiate service
  var user,
      plyFirebase,
      $rootScope,
      $q;

  beforeEach(inject(function (_user_,_plyFirebase_,_$rootScope_,_$q_) {
    user = _user_;
    plyFirebase = _plyFirebase_;
    $rootScope = _$rootScope_;
    $q = _$q_;
  }));

  it('should initialize all components', function () {
    expect(!!user).toBe(true);
    expect(user.addRemoveFavorites).toBeDefined();
  });

  //TODO - fix godamn test
  // it('should support adding a new song to favorites', function(done) {
  //   spyOn(plyFirebase,'removeWithQuery').and.callFake(function() {
  //     return $q.when({});
  //   });

  //   var params = {
  //     chordObj: {},
  //     isAddFlag: false,
  //     userKey: ''
  //   };

  //   user.addRemoveFavorites(params)
  //   .then(function(data) {
  //     console.log('msg');
  //     expect(data).toBeDefined();
  //     done();
  //   });
    
  //   $rootScope.$apply();
  // });

  //TODO - fix test
  // it('should get all of the users favorites', function(done) {
  //   spyOn(plyFirebase,'getNode').and.callFake(function() {
  //     return $q.reject({
  //       message: 'not existing'
  //     });
  //   }); 
  //   user.getFavorites('notExisting')
  //   .then(function(data) {
  //     console.log(data);
  //   })
  //   .catch(function(data) {
  //     expect(data).toBeDefined();
  //     expect(data.message).toBe();
  //     done();
  //   });

  //   $rootScope.$apply();
  // });
  
  // it('should check if a chord is a favorite', function(done) {
  //   user.isChordFavorite('-K4q5OByh18b-71C6Ju6','-JxLKLUR8irZN0TA__XK')
  //   .then(function(result) {
  //     expect(result).toBe(true);
  //     done();
  //   });
    
  //   $rootScope.$apply();

  // });
});
