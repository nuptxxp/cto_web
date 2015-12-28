'use strict';

describe('Directive: amchart', function () {

  // load the directive's module and view
  beforeEach(module('ctoWebApp'));
  beforeEach(module('app/amchart/amchart.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<amchart></amchart>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the amchart directive');
  }));
});
