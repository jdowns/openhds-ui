angular.module('openHDS.view')
    .controller('PregnancyOutcomeController',
        ['BackendService', 'AppState', '$location', PregnancyOutcomeController]);

function PregnancyOutcomeController(BackendService, AppState, $location) {
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
                outcomeDate: vm.outcomeDate,
                mother: vm.mother,
                collectionDateTime: new Date().toISOString()
            },
            collectedByUuid: vm.collectedByUuid
        };
        BackendService.post("/pregnancyOutcome", body).then(
            function(response) {
                console.log("yay! pregnancyOutcome " + JSON.stringify(response));
            },
            function(response) {
                console.log("oops " + response.status);
            }
        );
    }
}