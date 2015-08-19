'use strict';

angular.module('openHDS.individual', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/individual/new', {
            templateUrl: 'individualView/create.html',
            controller: 'IndividualController'
        });

    }])

    .controller('IndividualController', ['$scope', '$http', function($scope, $http) {
        $scope.firstName = 'first name';
        $scope.lastName = 'last name';
        $scope.middleName = 'middle name';
        $scope.gender = 'm/f';
        $scope.dateOfBirth = '1/1/1980';
        $scope.mother = "";
        $scope.father = "";
        $scope.fieldWorkerId = 123;
        //$http.post()
    }]);
