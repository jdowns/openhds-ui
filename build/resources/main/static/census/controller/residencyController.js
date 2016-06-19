angular.module('openHDS.view')
    .controller('ResidencyController',
        ['BackendService', 'AppState', '$location', ResidencyController]);

function ResidencyController(BackendService, AppState, $location) {
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
            residency:
            {
                individual: vm.individual,
                location: vm.location,
                startType: vm.startType,
                startDate: vm.startDate,
                collectionDateTime: new Date().toISOString()},
            collectedByUuid: vm.collectedByUuid};
        BackendService.post("/residency", body).then(
            function(response) {
                console.log("yay! residency " + JSON.stringify(response));
            },
            function(response) {
                console.log("oops " + response.status);
            }
        );
    }
}