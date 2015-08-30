'use strict';

angular.module('openHDS.login', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboardView/dashboard.html',
            controller: 'DashboardController'
        })
    }])

    .controller('DashboardController', ['$scope', '$http', '$location', 'userService',
        function($scope, $http, $location, userService) {
            $scope.userService = userService;
            $scope.newLocation = function() {
                $location.path('/location/new');
            }
    }]);
