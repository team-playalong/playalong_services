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
      },
      $rootScope;

  beforeEach(function() {
    module(function ($provide) {
        $provide.factory('chordsData', mockChordsData);
    });
  
  });
  
  beforeEach(inject(function (_chords_,_$rootScope_) {
    chords = _chords_;
    $rootScope = _$rootScope_;
    $rootScope.$apply();
  }));


  it('should initialize components', function () {
    expect(chords).toBeDefined();
    expect(chords.addChord).toBeDefined();
  });

  it('should support rating a chord', function() {
    expect(chords.rateChord).toBeDefined();
    //TODO = test it for real
  });

});
