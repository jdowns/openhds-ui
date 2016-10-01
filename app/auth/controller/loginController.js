angular.module('openhds')
    .controller('LoginController',
                ['$rootScope', '$location', '$http', LoginController]);

function LoginController($rootScope, $location, $http) {
    var vm = this;
    var configUrl = "/config.json";
    var restUrlConfigKey = 'openhdsRest';
    var homeUrl = "/baseline";

    var authenticate = function(credentials, success, failure) {
        var encoded = btoa(credentials.username + ":" + credentials.password);
        var headers = credentials ? {authorization : "Basic " + encoded} : {};
        console.log(headers);

        $http.get($rootScope.restApiUrl, {headers : headers}).then(function(response) {
            $rootScope.credentials = encoded;
            $rootScope.authenticated = response.status === 200;
            success && success();
        }, function(_) {
            $rootScope.authenticated = false;
            failure && failure();
        });
    };

    vm.load = function() {
        console.log('Initializing login form');
        $http.get(configUrl).then(function(response) {
            $rootScope.restApiUrl = response.data[restUrlConfigKey];
            console.log('Using Rest API at: ' + $rootScope.restApiUrl);
        });
    };

    vm.login = function(isValid) {
        var creds = {
            username: vm.username,
            password: vm.password
        };
        authenticate(creds,
                     function() {
                         $location.url(homeUrl);
                     },
                     function() {
                         vm.password = vm.username = null;
                     });
    };

    return vm;
};
