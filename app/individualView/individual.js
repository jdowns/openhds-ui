'use strict';

angular.module('openHDS.individual', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/individual/new', {
            templateUrl: 'individualView/create.html',
            controller: 'IndividualController'
        });

    }])

    .controller('IndividualController', ['$scope', '$http', 'userService', function($scope, $http, scopeService) {
        $scope.data = scopeService;
    }]);
