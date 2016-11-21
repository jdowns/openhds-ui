/*
if(window.i18next) {
    window.i18next.use(window.i18nextXHRBackend);

    window.i18next.init({
        debug: true,


        backend: {
            loadPath: '../locales/{{lng}}/{{ns}}.json'
        },
        useCookie: false,
        useLocalStorage: false
    }, function (err, t) {
        console.log('resources loaded');
    });
}
*/
angular.module('LoginModule', ['jm.i18next'])
    .controller('LoginController',
                ['$rootScope', '$location', '$http', '$i18next', LoginController]);

function LoginController($rootScope, $location, $http, $i18next) {
    var vm = this;
    var configUrl = "/config.json";
    var restUrlConfigKey = 'openhdsRest';
    var homeUrl = "/baseline";

    vm.t = $i18next.t;

    var authenticate = function(credentials, success, failure) {
        var encoded = btoa(credentials.username + ":" + credentials.password);
        var headers = {authorization : "Basic " + encoded};

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
