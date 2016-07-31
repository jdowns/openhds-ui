angular.module('openHDS.view')
    .controller('UserController',
        ['BackendService', 'AppState', '$location', UserController]);

function UserController(BackendService, AppState, $location) {
    //TODO: Implement This!
    var vm = this;
    if (!AppState.user) {
        console.log('no user...');
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
            visit:
            {
                extId: vm.extId,
                location: vm.location,
                visitDate: vm.visitDate,
                collectionDateTime: new Date().toISOString()},
            collectedByUuid: vm.collectedByUuid};
        BackendService.post("/user", body).then(
            function(response) {
                console.log("yay! user " + JSON.stringify(response));
            },
            function(response) {
                console.log("oops " + response.status);
            }
        );
    }
}
