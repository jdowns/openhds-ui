'use strict';

/* Controllers */

var openhds = angular.module('openhds', []);

openhds.controller('LocationCtrl', ['$scope',
    function($scope) {

        navigator.geolocation.getCurrentPosition(function(pos) {
            $scope.latitude = pos.coords.latitude;
            $scope.longitude = pos.coords.longitude;
            $scope.accuracy = pos.coords.accuracy;
            $scope.altitude = pos.coords.altitude;
        });

        $scope.locationHierarchy = [];
        $scope.locationName = '';
        $scope.locationType = 'rural';
        $scope.latitude = 0.0;
        $scope.longitude = 0.0;
        $scope.accuracy = 0.0;
        $scope.altitude = 0.0;
        $scope.fieldWorkerId = null;

        $scope.init = function() {
            return 1;

            //TODO: get location hierarchy
            //TODO: use geolocation for lat and long

        }
    }]);
