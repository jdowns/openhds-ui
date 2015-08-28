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
        var lc = this;
        lc.user = userService;

        this.login = function() {
            console.log("logging in");

            this.setBasicAuth(lc.user.username, lc.user.password);

            console.log(lc.user.server);
            $http.get(lc.user.server)
                .success(function (response) {
                    console.log('successful login!');
                    $location.path('#/dashboard');
                    console.log($location.path);
                 })
                .error(function (response) {
                    console.log("OOPS!");
                    console.log(response);
                });
        };

        this.setBasicAuth = function (username, password) {
            var authString = btoa(username + ':' + password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authString;
        };

        $scope.lc = lc;
    }])

    .factory('userService', function() {
        var serviceInstance = {};
        serviceInstance.username = null;
        serviceInstance.password = null;
        serviceInstance.server = null;

        serviceInstance.loggedIn = function() {
            return serviceInstance.username != null &&
                    serviceInstance.password != null;
        };

        return serviceInstance;
    });
