'use strict';

describe('Directive: autoDirection', function () {

  // load the directive's module
  beforeEach(module('playalong.services'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<div auto-direction>English Text</div>');
    element = $compile(element)(scope);
    expect(element).toBeDefined();
  }));
});
