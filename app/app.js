'use strict';
console.log("Starting application");

angular.module('openHDS', ['ngRoute'])
    .config(['$routeProvider', routeConfig])
    .config(['$httpProvider', corsConfig]);

function routeConfig($routeProvider) {
    $routeProvider
        .when('/home', {templateUrl: 'census/view/home.html'})
        .when('/location/new', {templateUrl: 'census/view/create-location.html'})
        .when('/individual/new', {templateUrl: 'census/view/create-individual.html'})
        .otherwise({redirectTo: '/home'});
}

function corsConfig($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.Authorization = 'Basic dXNlcjpwYXNzd29yZA==';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}