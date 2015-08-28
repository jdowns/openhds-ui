'use strict';

angular.module('openHDS.location', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/location/new', {
            templateUrl: 'locationView/create.html',
            controller: 'LocationController'
        })
    }])

    .controller('LocationController',
               ['$scope', '$http', '$location', '$window', 'locationService',
        function($scope, $http, $location, $window, locationService) {
            var server = "http://localhost:5000";

            $scope.data = locationService;
            $scope.submitForm = function() {
                $http.post(server + '/locations', $scope.data)
                    .success(function(data, status, headers, config) {
                        $location.path('/individual/new');
                    });
            };

            $scope.cancelLocation = function() {
                console.log('going back');
                $window.history.back();
            }

        }])
    .factory('locationService', function() {
        var scopeServiceInstance = {
            fieldWorkerId: null,
            locationHierarchy: ['Country', 'Region', 'District', 'Village', 'Subvillage'],
            locationType: null,
            name: "",
            pos: {
                coords: {
                    latitude: 'calculating...',
                    longitude: 'calculating...',
                    accuracy: 'calculating...',
                    altitude: 'calculating...'
            }
        }
    };

        navigator.geolocation.getCurrentPosition(function(pos) {
            scopeServiceInstance.pos = pos;
            console.log(scopeServiceInstance.pos.coords);
        });

        return scopeServiceInstance;
});