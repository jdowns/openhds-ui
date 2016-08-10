angular.module('openHDS.view')
    .controller('DeathController',
        ['BackendService', 'AppState', '$location', DeathController]);

function DeathController(BackendService, AppState, $location) {
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
            death: {
                visit: vm.visit,
                individual: vm.individual,
                deathPlace: vm.deathPlace,
                deathCause: vm.deathCause,
                deathDate: vm.deathDate,
                collectionDateTime: new Date()
            },
            collectedByUuid: vm.collectedByUuid
        };
        BackendService.post("/death", body).then(
            function (response) {
                console.log("yay! deathController " + JSON.stringify(response));
            },
            function (response) {
                console.log("oops " + response.status);
            }
        );
    }
}