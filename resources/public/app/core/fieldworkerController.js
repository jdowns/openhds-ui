angular.module('openHDS.view')
    .controller('FieldWorkerController',
        ['$http', 'AppState', '$location', FieldWorkerController]);

function FieldWorkerController($http, AppState, $location) {
    //TODO: Implement This!
    var vm = this;
    if (!AppState.user) {
        $location.url('/');
        return vm;
    }

    vm.create = validateCreate;

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }

    function create() {
        var body = {
            fieldWorkerId: vm.fieldWorkerId,
            firstName: vm.firstName,
            lastName: vm.lastName,
            password: vm.password
        };

        $http.post("/api/fieldworker", body).then(
            function (response) {
            },
            function (response) {
            }
        );
    }
}
