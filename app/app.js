'use strict';

angular.module('openHDS', [
    'ngRoute',
    'openHDS.model',
    'openHDS.census',
    'openHDS.censusService'
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .otherwise({redirectTo: '/home'});
}]);
