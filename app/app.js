'use strict';

angular.module('openHDS', [
  'ngRoute',
  'openHDS.location',
  'openHDS.version'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
