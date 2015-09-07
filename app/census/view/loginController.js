angular.module('openHDS.view').controller('LoginController', ['FieldWorkerService', 'BackendService', LoginController]);
console.log("Registering login controller");
function LoginController(FieldWorkerService, BackendService) {
    var vm = this;
    vm.login = login;

    function login() {
        BackendService.hostname = vm.server;
        FieldWorkerService.authorize(vm.username, vm.password)
    }
}