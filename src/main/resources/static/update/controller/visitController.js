angular.module('openHDS.view')
    .controller('VisitController',
        ['BackendService', 'AppState', '$location', VisitController]);

function VisitController(BackendService, AppState, $location) {
    var vm = this;
    if (!AppState.user) {
        $location.url('/');
        return vm;
    }

    vm.collectedByUuid = AppState.user.userId;
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
            collectedByUuid: vm.collectedByUuid};
        BackendService.post("/visit", body).then(
            function(response) {
                console.log("yay! visit " + JSON.stringify(response));
            },
            function(response) {
                console.log("oops " + response.status);
            }
        );
    }
}