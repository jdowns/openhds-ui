angular.module('openHDS.view')
    .controller('LoginController',
        ['$rootScope', '$location', '$http', LoginController]);

function LoginController($rootScope, $location, $http) {
    var vm = this;
    const configUrl = "/config.json";
    const restUrlConfigKey = 'openhdsRest';
    const fieldWorkerHome = "/fieldworkerHome";


    vm.login = login;
    
    vm.load = () => {
        $http.get(configUrl).then(response => {
            $rootScope.restApiUrl = response.data[restUrlConfigKey];
            console.log('Using Rest API at: ' + $rootScope.restApiUrl);
        });
    };

    var authenticate = function(credentials, success, failure) {
        var encoded = btoa(credentials.username + ":" + credentials.password);
        var headers = credentials ? {
            authorization : "Basic " + encoded
        } : {};

        $http.get($rootScope.restApiUrl, {headers : headers}).then(response => {
            $rootScope.credentials = encoded; //TODO: is this necessary?
            $rootScope.authenticated = response.status === 200;
            success && success();
        }, _ => {
            $rootScope.authenticated = false;
            failure && failure();
        });
    };

    function login(formValid) {
        if (formValid) {
            var creds = {
                username: vm.username,
                password: vm.password
            };
            authenticate(creds,
                () => $location.url(fieldWorkerHome),
                () => {
                    vm.password = vm.username = null;
                }
            );
        }
    }

}
