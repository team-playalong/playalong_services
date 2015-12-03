'use strict';

describe('Service: customerIoHelper', function () {

  // load the service's module
  beforeEach(module('playalong.services'));

  // instantiate service
  var customerIoHelper,
      login;
      window._cio = {};
      
  beforeEach(inject(function (_customerIoHelper_,_login_) {
    customerIoHelper = _customerIoHelper_;
    login = _login_;

    window._cio = {
      identify: function() {}
    };

    spyOn(window._cio,'identify').and.callFake(function() {});
  }));

  it('should do something', function () {
    expect(!!customerIoHelper).toBe(true);
    expect(customerIoHelper.identifyUser).toBeDefined();
  });

  it('should support identifying logged in users', function() {
    var result = customerIoHelper.identifyUser();
    expect(result).toBe(false);

    result = customerIoHelper.identifyUser(mockData.getMockUser());
    expect(window._cio.identify).toHaveBeenCalledWith({ id: 'google:116141183216896319819', email: 'atardadi@gmail.com', created_at: 123123123, firstName: 'Dadi', lastName: 'Atar', userType: 'superuser' });
    expect(result).toBe(true);
  });


});