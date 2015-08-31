'use strict';

angular.module('openHDS.census', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider.
            when('/home', {templateUrl: 'census/view/home.html'}).
            when('/location/new', {templateUrl: 'census/view/create-location.html'}).
            when('/individual/new', {templateUrl: 'census/view/create-individual.html'})
    })

    .controller('CensusController', ['$scope', '$http', '$location', 'Model', function($scope, $http, $location, Model) {
        $scope.model = {
            server: "http://www.example.com",
            fieldWorker: "fooBar",
            locationBinding: {
                externalId: '',
                name: '',
                locationType: '',
                parent: ''
            },
            individualBinding: {
                externalId: '',
                gender: '',
                dateOfBirth: '',
                firstName: ''
            }
        };

        $scope.Date = function() {
            return new Date();
        };

        $scope.startNewLocation = function() {
            $location.path('/location/new');
        };

        $scope.startNewIndividual = function() {
            $location.path('/individual/new');
        };

        $scope.returnToDashboard = function() {
            $location.path('/home');
        };

        $scope.setServer = function(server) {
            $scope.model.server = server;
        };

        $scope.createLocation = function() {
            $scope.model.location = new $scope.Location($scope.Date(), $scope.model.locationBinding);
            var url = $scope.model.server + '/locations';
            $http.post(url, $scope.model.location)
                .then(
                    function(response) {
                        $scope.model.location.uuid = response.data;
                        $scope.startNewIndividual();
                    },
                    function(response) {

                    }
                );
        };

        $scope.createIndividual = function() {
            $scope.model.individual = new $scope.Individual($scope.Date, $scope.model.individualBinding);
            var url = $scope.model.server + '/individuals';
            $http.post(url, $scope.model.individual)
                .then(
                    function(response) {
                        $scope.model.individual.uuid = response.data;
                        $scope.returnToDashboard();
                    },
                    function(response) {

                    }
            )
        };

        $scope.Location = Model.Location;
        $scope.Individual = Model.Individual;

    }]);