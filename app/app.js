'use strict';

angular.module('openHDS', [
    'ngRoute',
    'openHDS.login',
    'openHDS.location',
    'openHDS.individual',
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider


        .otherwise({redirectTo: '/dashboard'});
}]);
