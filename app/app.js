'use strict';

angular.module('openHDS', [
    'ngRoute',
    'openHDS.model',
    'openHDS.census',
    'openHDS.censusService',
    'openHDS.navigation'
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .otherwise({redirectTo: '/home'});
}]);
