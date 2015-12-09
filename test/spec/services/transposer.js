'use strict';

describe('Service: transposer', function () {

  // load the service's module
  beforeEach(module('playalong.services'));

  // instantiate service
  var transposer;
  beforeEach(inject(function (_transposer_) {
    transposer = _transposer_;
  }));

  it('should be defined', function () {
    expect(!!transposer).toBe(true);
  });

  it('should get equal chords', function() {
    var res = transposer.getEqualChord();
    expect(res).not.toBeDefined();

    res = transposer.getEqualChord('A#');
    expect(res).toBe('Bb');
  });

  it('should transpose a given chord', function() {
    var res = transposer.transpose("A");
    expect(res).toBe(null);

    res = transposer.transpose('A',1);
    expect(res).toBe('Bb');

    res = transposer.transpose('A',-1);
    expect(res).toBe('G#');


    res = transposer.transpose('A',3);
    expect(res).toBe('C');

    res = transposer.transpose('A',-3);
    expect(res).toBe('F#');

    res = transposer.transpose('A#',-3);
    expect(res).toBe('G');
  });

  

});
