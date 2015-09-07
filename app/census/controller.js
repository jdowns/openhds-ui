//'use strict';
//
//angular.module('openHDS')
//    .controller('CensusController', ['$scope', '$http', '$location', 'Model', 'CensusBackendService', 'NavigationService', function($scope, $http, $location, Model, CensusService, Navigation) {
//        $scope.Location = Model.Location;
//        $scope.Individual = Model.Individual;
//
//        $scope.fieldWorkerLogOut = function() {
//            $scope.model.fieldWorker = undefined;
//        };
//
//        $scope.fieldWorkerLogin = function() {
//            if ($scope.model.fieldWorker != undefined) {
//                console.log("Invalid login!");
//                $scope.errors = "Already logged in. Please log out.";
//                return;
//            }
//
//            CensusService.login($scope, $scope.model.login.backend,
//                $scope.model.login.username, $scope.model.login.password);
//
//            if(!$scope.errors) {
//                Navigation.startNewLocation();
//            }
//        };
//
//
//        $scope.Date = function() {
//            return new Date();
//        };
//
//        $scope.createLocation = function() {
//            CensusService.createLocation($scope);
//            Navigation.startNewIndividual();
//        };
//
//        $scope.createIndividual = function() {
//            $scope.model.individual = new $scope.Individual($scope.Date, $scope.model.individualBinding);
//            var url = $scope.model.server + '/individuals';
//            $http.post(url, $scope.model.individual)
//                .then(
//                    function(response) {
//                        $scope.model.individual.uuid = response.data;
//                        Navigation.returnToDashboard();
//                    },
//                    function(response) {
//
//                    }
//            )
//        };
//
//    }]);
