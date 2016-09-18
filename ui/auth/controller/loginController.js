angular.module('openHDS.core')
    .controller('LoginController',
        ['$rootScope', '$location', '$http', LoginController]);

function LoginController($rootScope, $location, $http) {
    const vm = this;
    const configUrl = "/config.json";
    const restUrlConfigKey = 'openhdsRest';
    const fieldWorkerHome = "/fieldworkerHome";
    
    vm.load = () => {
        $http.get(configUrl).then(response => {
            $rootScope.restApiUrl = response.data[restUrlConfigKey];
            console.log('Using Rest API at: ' + $rootScope.restApiUrl);
        });
    };

    vm.login = formValid => {
        if (formValid) {
            const creds = {
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

    var authenticate = function(credentials, success, failure) {
        const encoded = btoa(credentials.username + ":" + credentials.password);
        const headers = credentials ? {authorization : "Basic " + encoded} : {};

        $http.get($rootScope.restApiUrl, {headers : headers}).then(response => {
            $rootScope.credentials = encoded; //TODO: is this necessary?
            $rootScope.authenticated = response.status === 200;
            success && success();
        }, _ => {
            $rootScope.authenticated = false;
            failure && failure();
        });
    };
}
