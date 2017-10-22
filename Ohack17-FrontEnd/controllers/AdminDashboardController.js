var app = angular.module('AdminDashBoard', []);

app.controller('AdminDashBoardController', ['$scope', 'utilsService',
    function($scope, utilsService) {


        var init = function() {
            $scope.clientAvail = "";
            console.log("in init fn");
            //$scope.historyData = data;
            //console.log($scope.historyData);
            getData();

            $scope.$watch('clientAvail', function(newVal) {
                putData();
            });

        };

        $scope.showCurrentORHistory = function(val) {
            // $dialog.dialog({}).open('modalContent.html');
            if (val == "current") {
                $scope.current = true;
                $scope.history = false;
            } else {
                $scope.current = false;
                $scope.history = true;
            }
             $scope.showFeedBackDiv = false;
        };

        $scope.showFeedBack = function(history) {
           // $dialog.dialog({}).open('modalContent.html');
           $scope.feedback = history.feedback;
           $scope.showFeedBackDiv = true;
        }


        var putData = function(availabilityData) {
            //utilsService.getClientHistory();
            //TODO : post data here and redirect to Thank you page.
        }
        var getData = function() {
            console.log("in here ");
            /*utilsService.getClientHistory()
                .success(function(response) {
                    $scope.historyData = response;
                });*/
            $scope.historyData = utilsService.getClientHistory();

        };


        init();
    }
]);