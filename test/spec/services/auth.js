'use strict';

describe('Service: Auth', function () {

  // load the service's module
  beforeEach(module('playalong.services'));

  // instantiate service
  var Auth,
      login,
      $rootScope;
  beforeEach(inject(function (_Auth_,_login_,_$rootScope_) {
    Auth = _Auth_;
    login = _login_;

    login.userModel = {
      provider: 'facebook',
      facebook: {
        displayName: 'Dadi Atar'
      }
    };  

    $rootScope = _$rootScope_;
    $rootScope.$digest();

  }));

  it('should do something', function () {
    expect(!!Auth).toBe(true);
  });

});
