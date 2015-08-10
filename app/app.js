'use strict';

angular.module('openHDS', [
  'ngRoute',
    'openHDS.login',
  'openHDS.location',
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
