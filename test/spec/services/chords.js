'use strict';

describe('Service: chords', function () {

  // load the service's module
  beforeEach(module('playalong.services'));

  // instantiate service
  var chords;
  beforeEach(inject(function (_chords_) {
    chords = _chords_;
  }));

  it('should do something', function () {
    expect(!!chords).toBe(true);
  });

});
