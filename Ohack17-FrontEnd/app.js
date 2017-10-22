var app = angular.module('myApp', ['utils', 'ui.router', 'DashBoard', 'Login', 'Register', 'adminLogin', 'AdminDashBoard', 'schedulerDashBoard', 'schedule','analytics']);

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

    var adminState = {
        name: 'admin',
        url: '/admin',
        templateUrl: './views/admin.html',
        controller: 'AdminLoginController'
    };

    var adminDashBoardState = {
        name: 'adminDashboard',
        url: '/adminDashboard',
        templateUrl: './views/adminDashboard.html',
        controller: 'AdminDashBoardController'
    };

    var schedulerDashBoardState = {
        name: 'schedulerDashBoard',
        url: '/schedulerDashBoard',
        templateUrl: './views/schedulerDashBoard.html',
        controller: 'schedulerDashBoardController'
    };

    var scheduleState = {
        name: 'schedule',
        url: '/schedule',
        templateUrl: './views/schedule.html',
        controller: 'scheduleController'
    };

    var analyticsState = {
        name: 'analytics',
        url: '/analytics',
        templateUrl: './views/analytics.html',
        controller: 'analyticsController'
    };


    $stateProvider.state(loginState);
    $stateProvider.state(productState);
    $stateProvider.state(RegisterState);
    $stateProvider.state(adminState);
    $stateProvider.state(adminDashBoardState);
    $stateProvider.state(schedulerDashBoardState);
    $stateProvider.state(scheduleState);
    $stateProvider.state(analyticsState);
}]);