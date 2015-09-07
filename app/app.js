'use strict';
console.log("Starting application");


angular.module('openHDS.core', ['ngRoute'])
    .config(['$httpProvider', corsConfig])
    .config(['$routeProvider', routeConfig]);

angular.module('openHDS.model', ['openHDS.core']);

angular.module('openHDS.view', ['openHDS.core']);

//angular.module('openHDS', ['openHDS.core, openHDS.view', 'openHDS.model']);


function routeConfig($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'census/view/home.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })
        .when('/location/new', {templateUrl: 'census/view/create-location.html'})
        .when('/individual/new', {templateUrl: 'census/view/create-individual.html'})
        .otherwise({redirectTo: '/home'});
}

function corsConfig($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.Authorization = 'Basic dXNlcjpwYXNzd29yZA==';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
