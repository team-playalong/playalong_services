'use strict';

describe('weeklyChart: service', function () {
  var WeeklyChart;
  var $httpBackend;
  var PlyFirebase;
  var $q;

  // load the service's module
  beforeEach(module('playalong.services'));

  beforeEach(inject(function (_WeeklyChart_, _$rootScope_, _$httpBackend_, _PlyFirebase_, _$q_) {
    WeeklyChart = _WeeklyChart_;
    $httpBackend = _$httpBackend_;
    PlyFirebase = _PlyFirebase_;
    $q = _$q_;
    $httpBackend.whenGET(/i18n/).respond();
    _$rootScope_.$apply();
  }));


  it('should be initialized', function() {
    expect(WeeklyChart).toBeDefined();
  });

  // fit('should insert a new weekly chart', function(done) {
  //   spyOn(PlyFirebase, 'insert').and.returnValue($q.when({}));

  //   WeeklyChart.createWeeklyChart(mockData.getMockWeeklyChart())
  //   .then(function() {
  //     expect(PlyFirebase.insert).toHaveBeenCalledWith();
  //     done();
  //   });

  // });
});
