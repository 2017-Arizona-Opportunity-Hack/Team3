var app = angular.module('Login', []);

app.controller('LoginController', ['$scope', '$location',
    function($scope, $location) {

        var init = function() {

        }

        $scope.submit = function() {
            console.log("in submit fn");
            $location.path('dashboard');
        }

        $scope.register = function() {
            console.log("in submit fn");
            $location.path('register');
        }
        
        init();
    }
]);