'use strict';

describe('Service: plyFirebase', function () {
  var $rootScope;
  var plyFirebase;
  var $timeout;
  
  // load the service's module
  beforeEach(module('playalong.services'));

  beforeEach(inject(function (_plyFirebase_,_$rootScope_,_$timeout_) {
    plyFirebase = _plyFirebase_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
  }));

  it('should do something', function () {
    expect(!!plyFirebase).toBe(true);
  });

  it('should get a reference based on path', function() {
    var res = plyFirebase.getRef();
    expect(res).toBeDefined();
  });


  //TODO - make it work with mock
  // it('should get the value of a node', function(done) {
  //   plyFirebase.getNode({
  //     relPath: 'users',
  //     isOnce: true
  //   })
  //   .then(function(data) {
  //     expect(data).toBeDefined();
  //     done();
  //   });

  //   setTimeout(function() {
  //     $rootScope.$apply();
  //   },1000);
  // });

  // it('should perform a simple select query', function(done) {
  //   plyFirebase.selectSimpleQuery('users', 'firstName','equalTo','Dadi')
  //   .then(function(data) {
  //     expect(data).toBeDefined();
  //     expect(Object.keys(data).length).toBeDefined();
  //     done();
  //   });

  //   setTimeout(function() {
  //     $rootScope.$apply();
  //   },2000);
  // });


  // it('should support inserting a new record to a reference', function(done) {
  //   plyFirebase.insert('users',{
  //     name: 'Dadi the man'
  //   })
  //   .then(function(data) {
  //     expect(data).toBeDefined();
  //     done();
  //   });

  //   setTimeout(function() {
  //     $rootScope.$apply();
  //   },2000);
  // });

  // it('should support removing a node based on a query', function(done) {
  //   plyFirebase.removeWithQuery('users', 'name','equalTo','Dadi the man')
  //   .then(function(data) {
  //     expect(data.message).toBe('success');
  //     done();
  //   });

  //   setTimeout(function() {
  //     $rootScope.$apply();
  //   },2000);
  // });
});