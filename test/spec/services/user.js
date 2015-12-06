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

  it('should support adding a new song to favorites', function(done) {
    spyOn(plyFirebase,'removeWithQuery').and.callFake(function() {
      return $q.when({});
    });

    var params = {
      chordObj: {},
      isAddFlag: false,
      userKey: ''
    };

    user.addRemoveFavorites(params)
    .then(function(data) {
      expect(data).toBeDefined();
      done();
    });
    $rootScope.$apply();
  });
});
