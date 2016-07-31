angular.module('openHDS.view')
    .controller('LoginController',
        ['BackendService', 'AppState', '$location', '$http', LoginController]);

function LoginController(BackendService, AppState, $location, $http) {
    var vm = this;
    vm.isSupervisor = false;
    vm.loginPending = false;
    vm.create = validateCreate;
    vm.login = login;

    function login(formValid) {
        if (formValid) {
            vm.loginPending = true;
            console.log("Form is valid " + JSON.stringify(vm));
            var body = {
                username: vm.username,
                password: vm.password,
                isSupervisor: vm.isSupervisor
            };

            var url = "/api/fieldworker";
            if (vm.isSupervisor) {
                url = "/api/user"
            }

            $http.put(url, body).then(
                function(response) {
                    AppState.user = {
                        isSupervisor: response.config.data.isSupervisor,
                        userId: response.data
                    };
                    AppState.errors = {};

                    if(AppState.user.isSupervisor) {
                        $location.url('/supervisorHome')
                    } else {
                        $location.url('/fieldworkerHome')
                    }
                    console.log("yay login " + JSON.stringify(AppState.user));
                },
                function(response) {
                    vm.username = null;
                    vm.password = null;
                    AppState.user = {};
                    AppState.errors = ["Invalid Credentials."];
                    console.log("boo login " + JSON.stringify(response));
                }
            );

        } else {
            console.log("Form is invalid " + JSON.stringify(vm));
        }
    }

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }
    function create() {
    }
}

function supervisorLogin(user, $http, controller) {

}

function fieldworkerLogin(user, $http, controlle) {

}
