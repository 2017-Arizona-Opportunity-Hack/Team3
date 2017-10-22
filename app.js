
var app = angular.module('myApp', ['utils', 'ui.router', 'DashBoard', 'Login','Register']);

app.controller('rootController', ['$scope', '$state', function($scope, $state) {
    $scope.aVal = 10;
    $scope.bVal = 100;



}]);


app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    var loginState = {
        name: 'login',
        url: '/login',
        templateUrl: './views/login.html',
        controller: 'LoginController'
    };

    var productState = {
        name: 'dashboard',
        url: '/dashboard',
        templateUrl: './views/dashboard.html',
        controller: 'DashBoardController'
    };
        var RegisterState = {
        name: 'register',
        url: '/register',
        templateUrl: './views/register.html',
        controller: 'RegisterController'
    };


    $stateProvider.state(loginState);
    $stateProvider.state(productState);
    $stateProvider.state(RegisterState);
}]);