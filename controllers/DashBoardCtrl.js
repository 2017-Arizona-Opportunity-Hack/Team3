var app = angular.module('DashBoard', []);

app.controller('DashBoardController', ['$scope', 'utilsService',
    function($scope, utilsService) {


        var init = function() {
            $scope.clientAvail = "";
            alert("in alert of dashboard");
            console.log("in init fn");
            //$scope.historyData = data;
            //console.log($scope.historyData);
            getData();

            $scope.$watch('clientAvail', function(newVal) {
                putData();
            });

        };


        var putData = function() {
        	//utilsService.getClientHistory();
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