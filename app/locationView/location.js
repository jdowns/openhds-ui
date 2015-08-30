'use strict';

angular.module('openHDS.location', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/location/new', {
            templateUrl: 'locationView/create.html',
            controller: 'LocationController'
        })
    }])

    .controller('LocationController',
               ['$scope', '$http', '$location', '$window', 'userService',
        function($scope, $http, $location, $window, userService) {
            var server = "http://localhost:5000";

            $scope.data = userService;
            $scope.newLocation = {
                locationName: 'New Location...',
                locationType: '',
                latitude: '',
                longitude: ''

            };
            $scope.submitForm = function() {
                console.log('submitting form...');
                $http.post(server + '/locations', $scope.data)
                    .success(function(data, status, headers, config) {
                        console.log('success!');
                        $scope.locationId = data;
                        $location.path('/individual/new');
                    });
            };

            $scope.cancelLocation = function() {
                console.log('going back');
                $window.history.back();
            }

        }]);