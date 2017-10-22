var app = angular.module('DashBoard', []);

app.controller('DashBoardController', ['$scope', 'utilsService',
    function($scope, utilsService) {


        var init = function() {
            $scope.clientAvail = "";
            console.log("in init fn");
            //$scope.historyData = data;
            //console.log($scope.historyData);
            getData();

            $scope.$watch('clientAvail', function(newVal) {

                if (newVal) {
                   //$scope.putData(newVal);
                }

            });

        };

        $scope.showFeedBack = function(history) {
            // $dialog.dialog({}).open('modalContent.html');
            $scope.feedback = history.feedback;
            $scope.showFeedBackDiv = true;
        }

        $scope.submitAvailability = function() {
            $scope.putData($scope.clientAvail);
        }


         $scope.putData = function(availabilityData) {
            console.log("availabilityData: ",availabilityData);
            utilsService.submiAvailability(availabilityData).success(function(res) {
                console.log(res);
            }).error(function(err) {
                console.log(err);
            });
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