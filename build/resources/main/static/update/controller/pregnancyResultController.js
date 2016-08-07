angular.module('openHDS.view')
    .controller('PregnancyResultController',
        ['BackendService', 'AppState', '$location', PregnancyResultController]);

function PregnancyResultController(BackendService, AppState, $location) {
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
            pregnancyResult:
            {
                type: vm.type,
                pregnancyOutcome: vm.pregnancyOutcome,
                child: vm.child,
                collectionDateTime: new Date().toISOString()
            },
            collectedByUuid: vm.collectedByUuid
        };
        BackendService.post("/pregnancyResult", body).then(
            function(response) {
                console.log("yay! pregnancyResult " + JSON.stringify(response));
            },
            function(response) {
                console.log("oops " + response.status);
            }
        );
    }
}