'use strict';

angular.module('openHDS.census', ['ngRoute', 'openHDS.censusService'])
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider.
            when('/home', {templateUrl: 'census/view/home.html'}).
            when('/location/new', {templateUrl: 'census/view/create-location.html'}).
            when('/individual/new', {templateUrl: 'census/view/create-individual.html'});

        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.Authorization = 'Basic dXNlcjpwYXNzd29yZA==';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])

    .controller('CensusController', ['$scope', '$http', '$location', 'Model', 'CensusBackendService', 'NavigationService', function($scope, $http, $location, Model, CensusService, Navigation) {
        $scope.navigation = new Navigation();
        $scope.Location = Model.Location;
        $scope.Individual = Model.Individual;

        $scope.fieldWorkerLogOut = function() {
            $scope.model.fieldWorker = undefined;
        };

        $scope.fieldWorkerLogin = function() {
            if ($scope.model.fieldWorker != undefined) {
                $scope.errors = "Already logged in. Please log out.";
                return;
            }
            var username = $scope.model.login.username;
            var password = $scope.model.login.password;
            var backend = $scope.model.login.backend;

            CensusService.login($scope, backend, username, password);

            if(!$scope.errors) {
                $scope.navigation.startNewLocation();
            }
        };

        $scope.model = {
            server: "http://www.example.com",
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

        $scope.createLocation = function() {
            CensusService.createLocation($scope);
            $scope.navigation.startNewIndividual();
        };

        $scope.createIndividual = function() {
            $scope.model.individual = new $scope.Individual($scope.Date, $scope.model.individualBinding);
            var url = $scope.model.server + '/individuals';
            $http.post(url, $scope.model.individual)
                .then(
                    function(response) {
                        $scope.model.individual.uuid = response.data;
                        $scope.navigation.returnToDashboard();
                    },
                    function(response) {

                    }
            )
        };

    }]);
