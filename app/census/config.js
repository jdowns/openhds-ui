//angular.module('openHDS')
//    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
//        console.log("IN CONFIG!");
//        $routeProvider.
//            when('/home', {templateUrl: 'census/view/home.html'}).
//            when('/location/new', {templateUrl: 'census/view/create-location.html'}).
//            when('/individual/new', {templateUrl: 'census/view/create-individual.html'});
//
//        $httpProvider.defaults.useXDomain = true;
//        $httpProvider.defaults.headers.Authorization = 'Basic dXNlcjpwYXNzd29yZA==';
//        delete $httpProvider.defaults.headers.common['X-Requested-With'];
//    }]);