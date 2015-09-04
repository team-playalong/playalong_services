'use strict';

describe('Service: chords', function () {

  // load the service's module
  beforeEach(module('playalong.services'));

  // instantiate service
  var chords,
      mockChordsData = function() {
        return {
          $add: function() {

          }
        };
      };

  beforeEach(function() {
    module(function ($provide) {
        $provide.factory('chordsData', mockChordsData);
    });
  
  });
  
  beforeEach(inject(function (_chords_) {
    chords = _chords_;
  }));

  it('should initialize components', function () {
    expect(chords).toBeDefined();
    expect(chords.addChord).toBeDefined();
  });

  
});
