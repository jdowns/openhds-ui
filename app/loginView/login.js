'use strict';

angular.module('openHDS.login', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'loginView/login.html',
            controller: 'LoginCtrl'
        });

    }])

    .controller('LoginCtrl', ['$scope', '$http', 'userService', function($scope, $http, userService) {
        $scope.user = userService;
    }])

    .factory('userService', function() {
        var serviceInstance = {};
        serviceInstance.username = null;
        serviceInstance.password = null;
        serviceInstance.login = function(username, password) {
            serviceInstance.username = username;
            serviceInstance.password = password;
            console.log("logging in");
        }

        return serviceInstance;
    });

