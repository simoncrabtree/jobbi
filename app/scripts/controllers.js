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
        ]},
        {id: "4",
            address: "12 Leyburn Grove, BD16 4LU",
            tasks: [
                {id:"1", description: "Repointing front elevation"},
                {id:"2", description: "Repair roof tiles on porch canopy"}
        ]},
        {id: "5",
            address: "11 Stable Courtyard, BD23 2AE",
            tasks: [
                {id:"1", description: "Air conditioning fault investigation"}
            ]
        }
    ]
};

jobbiApp.controller('HomeController', function($scope) {
    $scope.jobs = [];
    var sigDiv = $("#signature");
    sigDiv.jSignature();
    sigDiv.jSignature("reset");

    var icons = {
        "isActive": "briefcase",
        "isSuspended": "pause",
        "isComplete": "check"
    }
    data.jobs.forEach(function (job) {
        var modelJob = job;
        modelJob.state = "pending";
        modelJob.isSelected = false;
        modelJob.isActive = false;
        modelJob.readyForSignature = false;
        $scope.jobs.push(modelJob);
    });
    $scope.mode = "list";
    $scope.selectedJob = {};
    $scope.jobCount = function () {
        return $scope.jobs.length;
    };
    $scope.select = function (job) {
        $scope.selectedJob = job;
        $scope.mode = "details";
    };
    $scope.depart = function () {
        $scope.selectedJob.state = "isActive";
        $scope.mode = "list";
    };
    $scope.suspend = function () {
        $scope.selectedJob.state = "isSuspended";
        $scope.mode = "list";
    }
    $scope.resume = function () {
        $scope.selectedJob.state = "isActive";
        $scope.mode = "list";
    }
    $scope.captureSig = function () {
        $scope.selectedJob.state = "signatureCaptured";
        $scope.selectedJob.signature = sigDiv.jSignature("getData", "svgbase64");
        sigDiv.jSignature("reset");
        $scope.selectedJob.state = "isComplete";
        $scope.mode = "list";
    }
    $scope.unSelect = function () {
        $scope.selectedJob.isSelected = false;
        $scope.selectedJob = undefined;
        $scope.mode = "list";
    };
    $scope.showSavedSignature = function () {
        if ($scope.selectedJob.state === "isComplete") {
            return true;
        }
        return false;
    };
    $scope.showSignatureCapture = function () {
        return ($scope.selectedJob && $scope.selectedJob.state === "isActive");
    }
    $scope.getImageSrc = function () {
        if ($scope.selectedJob.signature) {
            return "data:" + $scope.selectedJob.signature[0] + "," + $scope.selectedJob.signature[1];
        }
        return "";
    }
    $scope.getStatusIcon = function (job) {
        console.log("Getting State of job", job);
        return icons[job.state];
    }

});
