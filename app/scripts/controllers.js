'use strict';

var data = {
    jobs: [
        {id: "1", description: "Service boiler"},
        {id: "2", description: "Fit new radiator in hallway"},
        {id: "3", description: "Check taps in kitchen"}
    ]
};

jobbiApp.controller('HomeController', function($scope) {
    $scope.jobCount = function () {
        return $scope.jobs.length;
    };
    $scope.jobs = data.jobs;
});

jobbiApp.controller('JobController', function($scope, $routeParams) {
    var jobId = $routeParams.jobId;
    var matchingJobs = data.jobs.filter(function (job) {
        return (job.id === jobId);
    });
    $scope.job = matchingJobs[0];
});
