var app = angular.module('schedule', []);

app.controller('scheduleController', ['$scope', '$location', 'utilsService',
    function($scope, $location, utilsService) {

        var init = function() {
            $scope.emailValue = "";
            $scope.pwdValue = "";
        }

        
        $scope.schedule = function() {
            console.log("in submit fn");
            alert("Scheduled successfully")
            $location.path('schedulerDashBoard');
        }

        init();
    }
]);