'use strict';

var data = {

    jobs: [{id: "1",
        address: "1 Broad Street, BD1 23F",
        tasks: [
            {id: "1", description: "Service boiler"},
            {id: "2", description: "Fit new radiator in hallway"},
            {id: "3", description: "Check taps in kitchen"},
            {id: "4", description: "Replace fusebox"}
        ]},
        {id: "2",
            address: "392 High Street, LS2 9AE",
            tasks: [
                {id: "1", description: "Repair leaking tap in bathroom"}
            ]},
        {id: "3",
            address: "70 Green Drive, WA15 6JW",
            tasks: [
                {id:"1", description: "Repairs to flat roof"}
            ]}
    ]
};

jobbiApp.controller('HomeController', function($scope) {
    $scope.jobs = [];
    data.jobs.forEach(function (job) {
        var modelJob = job;
        modelJob.isSelected = false;
        modelJob.isActive = false;
        $scope.jobs.push(modelJob);
    });
    $scope.mode = "list";
    $scope.selectedJob;
    $scope.activeJob;
    $scope.jobCount = function () {
        return $scope.jobs.length;
    };
    $scope.select = function (job) {
        console.log("Selecting", job);
        if ($scope.selectedJob ) $scope.selectedJob.isSelected = false;
        job.isSelected = true;
        $scope.selectedJob = job;
        $scope.mode = "details";
    };
    $scope.depart = function (job) {
        console.log("Departing", job);
        job.isActive = true;
        $scope.activeJob = job;
        $scope.mode = "list";
    };
    $scope.unSelect = function () {
        $scope.selectedJob.isSelected = false;
        $scope.selectedJob = undefined;
        $scope.mode = "list";

    }
});

jobbiApp.controller('JobController', function($scope, $routeParams) {
    var jobId = $routeParams.jobId;
    var matchingJobs = data.jobs.filter(function (job) {
        return (job.id === jobId);
    });

    $scope.job = matchingJobs[0];

    $scope.job.imageData;

    $scope.takePhoto = function () {
        console.log("Taking Photo... say cheese now!");
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,
            encodingType: 0
        };
        navigator.camera.getPicture(
            function (imageData) {
            console.log("Took Photo" + imageData);
            $scope.job.imageData = "data:image/jpeg;base64," + imageData;
            $scope.$apply();
        },
        function () {
            console.log("ERROR taking photo");
        },
        options
        );
    }

});
