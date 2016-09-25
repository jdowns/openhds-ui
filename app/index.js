'use strict';

console.log('starting application');

angular.module('openhds', ['ngRoute'])
    .config(['$httpProvider', corsConfig])
    .config(['$routeProvider', routeConfig]);

function routeConfig($routeProvider) {
    console.log('route config');
    $routeProvider
        .when('/', {
            templateUrl: 'auth/view/login.html',
            controller: 'LoginController',
            controllerAs: 'model'
        })
        .when('/baseline', {
            templateUrl: 'baseline/view/baseline.html',
            controller: 'BaselineController',
            controllerAs: 'model'
        });
}

function corsConfig($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
