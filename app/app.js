'use strict';

angular.module('openHDS', [
  'ngRoute',
  'openHDS.location',
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
