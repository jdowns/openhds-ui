'use strict';

angular.module('openHDS', [
    'ngRoute',
    'openHDS.model',
    'openHDS.census'
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .otherwise({redirectTo: '/home'});
}])
