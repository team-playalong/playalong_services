'use strict';

describe('Directive: autoDirection', function () {

  // load the directive's module
  beforeEach(module('playalong.services'));

  var element,
      $httpBackend,
      scope;

  beforeEach(inject(function ($rootScope,_$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('/locales/en.json').respond();
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    scope.test = 'rtl';
    element = angular.element('<div auto-direction auto-direction-scope-var="test">English Text</div>');
    element = $compile(element)(scope);
    scope.$apply();
    dumper(element);
    expect(element.css('direction')).toEqual('rtl');
  }));
});
