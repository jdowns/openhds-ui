'use strict';

/* Controllers */

var openhdsControllers = angular.module('openhdsControllers', []);

openhdsControllers.controller('AppCtrl', ['$scope',
  function($scope) {
    $scope.data = "Hello, World";
  }]);

