'use strict';

angular.module('openHDS.login', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'loginView/login.html',
            controller: 'LoginController'
        });
        $routeProvider.when('/dashboard', {
            templateUrl: 'loginView/dashboard.html',
            controller: 'LoginController'
        });

    }])

    .controller('LoginController', ['$scope', '$http', 'userService', function($scope, $http, userService) {
        var lc = this;

        this.login = function(username, password) {
            userService.username = username;
            userService.password = password;
            console.log("logging in");
        };
        lc.user = userService;

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

