angular.module('openHDS.view')
    .controller('FieldWorkerController',
        ['BackendService', 'AppState', '$location', FieldWorkerController]);

function FieldWorkerController(BackendService, AppState, $location) {
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
        console.log("creating fieldworker...");
        var body = {
            fieldWorkerId: vm.fieldWorkerId,
            firstName: vm.firstName,
            lastName: vm.lastName,
            password: vm.password
        };

        console.log(body);
        BackendService.post("/api/fieldworker", body).then(
            function (response) {
                console.log("yay! fieldworker " + JSON.stringify(response));
            },
            function (response) {
                console.log("oops " + response.status);
            }
        );
    }
}
