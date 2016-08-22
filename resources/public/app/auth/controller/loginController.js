angular.module('openHDS.view')
    .controller('LoginController',
        ['AppState', '$location', '$http', LoginController]);

function LoginController(AppState, $location, $http) {
    var vm = this;
    vm.isSupervisor = false;
    vm.loginPending = false;
    vm.login = login;

    function handleLogin(response) {
        AppState.user = {
            isSupervisor: response.config.data.isSupervisor,
            userId: response.data
        };
        AppState.errors = {};
        if(AppState.user.isSupervisor) {
            $location.url('/supervisorHome');
        } else {
            $location.url('/fieldworkerHome');
        }
    }

    function handleLoginError(response) {
        vm.username = null;
        vm.password = null;
        AppState.user = {};
        AppState.errors = ["Invalid Credentials."];
    }

    function login(formValid) {
        if (formValid) {
            var body = {
                username: vm.username,
                password: vm.password,
                isSupervisor: vm.isSupervisor
            };

            var url = "/api/fieldworker";
            if (vm.isSupervisor) {
                url = "/api/user";
            }

            $http.put(url, body).then(handleLogin, handleLoginError);
        }
    }

}
