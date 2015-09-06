angular.module('openHDS').controller('LoginController', ['FieldWorkerService', LoginController]);

function LoginController(FieldWorkerService) {
    var vm = this;

    vm.user = '';
    vm.password = '';
}
