

describe('Service: config', function () {
  'use strict';
  // load the service's module
  beforeEach(module('playalong.services'));

  // instantiate service
  var config;
  beforeEach(inject(function (_config_) {
    config = _config_;
  }));

  it('should do something', function () {
    expect(!!config).toBe(true);
  });

});
