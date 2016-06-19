angular.module('openHDS.view')
    .controller('PregnancyObservationController',
        ['BackendService', 'AppState', '$location', PregnancyObservationController]);

function PregnancyObservationController(BackendService, AppState, $location) {
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
            pregnancyOutcome:
            {
                visit: vm.visit,
                expectedDeliveryDate: vm.expectedDeliveryDate,
                pregnancyDate: vm.pregnancyDate,
                mother: vm.mother,
                collectionDateTime: new Date().toISOString()
            },
            collectedByUuid: vm.collectedByUuid
        };
        BackendService.post("/pregnancyObservation", body).then(
            function(response) {
                console.log("yay! pregnancyObservation " + JSON.stringify(response));
            },
            function(response) {
                console.log("oops " + response.status);
            }
        );
    }
}