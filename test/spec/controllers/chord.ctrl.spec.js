
describe('Controller: ChordCtrl', function () {
  'use strict';

  // load the controller's module
  beforeEach(module('playalongServicesApp'));

  var ChordCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    ChordCtrl = $controller('ChordCtrl', {
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ChordCtrl.awesomeThings.length).toBe(3);
  });
});
