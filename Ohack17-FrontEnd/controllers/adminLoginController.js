var app = angular.module('adminLogin', []);

app.controller('AdminLoginController', ['$scope', '$location', 'utilsService',
    function($scope, $location, utilsService) {

        var init = function() {
            $scope.emailValue = "";
            $scope.pwdValue = "";
            $scope.error = "";
        }

        $scope.submit = function() {
           
           

            console.log("in submit fn");
            console.log($scope.emailValue);
            if ($scope.emailValue != "" && $scope.pwdValue != "") {
                utilsService.loginAdmin(
                    $scope.emailValue,
                    $scope.pwdValue
                ).success(function(response) {
                    console.log(response);
                    $scope.error = "";
                    if (response) {
                        if (response.role_id == 0) {
                        	$location.path('analytics');
                        } else if(response.role_id == 1) {
                        	 $location.path('schedule');
                        } else if(response.role_id == 2) {
                        	$location.path('adminDashboard');
                        }
                    } else {
                    	$location.path('login');
                    }
                   
                }).error(function(error) {
                    console.log(error);
                    $scope.error = "Please enter valid Credentials";
                    //$location.path('dashboard');
                });
            } else {

            }




        }

        $scope.register = function() {
            console.log("in submit fn");
            $location.path('register');
        }

        init();
    }
]);