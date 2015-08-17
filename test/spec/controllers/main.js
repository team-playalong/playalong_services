'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('playalong.services'));

  var MainCtrl,
      $rootScope,
      scope;


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$rootScope_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should initialize all components', function () {
    expect(scope).toBeDefined();
    expect(scope.increaseChordHitCount).toBeDefined();
    expect(scope.getChordById).toBeDefined(); 
    expect(scope.searchBy).toBeDefined(); 
  });
});
