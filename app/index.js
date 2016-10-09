'use strict';

console.log('starting application');

var app = angular.module('openhds',
    ['ngRoute', 'smart-table',
     'LoginModule', 'BaselineModule',
     'ServiceModule']);



app.config(['$httpProvider', corsConfig]);
app.config(['$routeProvider', routeConfig]);

function routeConfig($routeProvider) {
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
