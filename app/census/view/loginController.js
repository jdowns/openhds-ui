angular.module('openHDS.view')
    .controller('LoginController',
    ['FieldWorkerService', 'BackendService', 'NavigationService', LoginController]);

function LoginController(FieldWorkerService, BackendService, NavigationService) {
    var vm = this;
    vm.login = login;

    function login() {
        BackendService.hostname = vm.server;
        console.log("Logging in");
        //if (!vm.username || !vm.password || !vm.server)
        FieldWorkerService.authorize(vm.username, vm.password, function(result) {
            if (!result) {
                vm.errors = "Invalid username or password";
            } else {
                vm.errors = "";
                console.log("Logged in");
                NavigationService.startNewLocation();
            }
        });
    }
}