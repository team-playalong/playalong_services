

describe('Service: chord', function () {
  'use strict';
  
  // load the service's module
  beforeEach(module('playalong.services'));

  // instantiate service
  var chord;
  beforeEach(inject(function (_chord_) {
    chord = _chord_;
  }));

  it('should do something', function () {
    expect(!!chord).toBe(true);
  });

});
