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
        var body = {
            visit: {
                extId: vm.extId,
                location: vm.location,
                visitDate: vm.visitDate,
                collectionDateTime: new Date().toISOString()
            },
            collectedByUuid: vm.collectedByUuid
        };
        BackendService.post("/fieldworker", body).then(
            function (response) {
                console.log("yay! fieldworker " + JSON.stringify(response));
            },
            function (response) {
                console.log("oops " + response.status);
            }
        );
    }
}