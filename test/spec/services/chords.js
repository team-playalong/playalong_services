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
      $httpBackend,
      $rootScope;

  beforeEach(function() {
    module(function ($provide) {
        $provide.factory('chordsData', mockChordsData);
    });

  });

  beforeEach(inject(function (_chords_,_$rootScope_,_$httpBackend_) {
    chords = _chords_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET(/i18n/).respond();
    $rootScope.$apply();
  }));


  it('should initialize components', function () {
    expect(chords).toBeDefined();
    expect(chords.addChord).toBeDefined();
  });

});
