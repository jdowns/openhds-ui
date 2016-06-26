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
        vm.date = new Date().toISOString();
        var body = {
            visit: {
                extId: vm.extId,
                location: vm.location,
                visitDate: vm.visitDate,
                collectionDateTime: vm.date
            },
            collectedByUuid: vm.collectedByUuid};
        BackendService.post("/visit", body).then(
            function(response) {
                $location.url('/visit');
                BackendService.get("/individual?location=" + vm.location).then(
                    function(response) {

                    },
                    function(response) {
                        
                    }
                );
                console.log("yay! visit " + JSON.stringify(response));
            },
            function(response) {
                console.log("oops " + response.status);
            }
        );
    }
}