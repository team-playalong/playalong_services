'use strict';

describe('Service: Auth', function () {

  // load the service's module
  beforeEach(module('playalong.services'));

  // instantiate service
  var Auth,
      login,
      $httpBackend,
      $rootScope;
      
  beforeEach(inject(function (_Auth_,_login_,_$rootScope_,_$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET(/i18n/).respond();
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
