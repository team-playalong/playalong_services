'use strict';

describe('Service: user', function () {

  // load the service's module
  beforeEach(module('playalong.services'));

  // instantiate service
  var user;
  beforeEach(inject(function (_user_) {
    user = _user_;
  }));

  it('should initialize all components', function () {
    expect(!!user).toBe(true);
    expect(user.addRemoveFavorites).toBeDefined();
  });

  it('should add and remove from favorites', function() {
    var userId = 1,
        chordId = 2,
        isAddFlag = true;

    user.addRemoveFavorites(userId, chordId,isAddFlag);
  });

});
