'use strict';

/* App Module */

var openhdsApp = angular.module('openhdsApp', [
  'ngRoute',
  'openhdsControllers',
  'openhdsFilters',
  'openhdsServices'
]);

openhdsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/phone-list.html',
        controller: 'AppCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
