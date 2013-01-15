'use strict';

var jobbiApp = angular.module('jobbiApp', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .when('/job/:jobId', {
        templateUrl: 'views/job.html',
        controller: 'JobController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
