'use strict';

describe('Controller: HomeController', function() {

  // load the controller's module
  beforeEach(module('jobbiApp'));

  var HomeController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    HomeController = $controller('HomeController', {
      $scope: scope
    });
  }));

  it('should contain 3 jobs', function() {
    expect(scope.jobCount()).toBe(3);
  });
});
