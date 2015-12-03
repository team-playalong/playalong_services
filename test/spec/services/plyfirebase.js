'use strict';

describe('Service: plyFirebase', function () {
  var $rootScope;

  // load the service's module
  beforeEach(module('playalong.services'));

  // instantiate service
  var plyFirebase;
  beforeEach(inject(function (_plyFirebase_,_$rootScope_) {
    plyFirebase = _plyFirebase_;
    $rootScope = _$rootScope_;
  }));

  it('should do something', function () {
    expect(!!plyFirebase).toBe(true);
  });

  it('should get a reference based on path', function() {
    var res = plyFirebase.getRef();
    expect(res).toBeDefined();
  });

  it('should get a reference with a callback function', function(done) {
    window.dummyFunc = function() {};
    spyOn(window,'dummyFunc');

    plyFirebase.getRefWithCallback();
    expect(window.dummyFunc).not.toHaveBeenCalled();

    plyFirebase.getRefWithCallback({
      relPath: 'asdasd',
      callback: window.dummyFunc,
      isOnce: true
    });

    setTimeout(function() {
      expect(window.dummyFunc).toHaveBeenCalled();
      done();
    },3000);
    
  });

  it('should perform a simple select query', function(done) {
    plyFirebase.selectSimpleQuery('users', 'firstName','equalTo','Dadi')
    .then(function(data) {
      expect(data).toBeDefined();
      done();
    });

    $rootScope.$apply();

  });

});
