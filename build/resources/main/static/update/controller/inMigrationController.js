angular.module('openHDS.view')
    .controller('InMigrationController',
        ['BackendService', 'AppState', '$location', InMigrationController]);

function InMigrationController(BackendService, AppState, $location) {
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
            inMigration: {
                origin: vm.origin,
                reason: vm.reason,
                migrationType: vm.migrationType,
                migrationDate: vm.migrationDate,
                visit: vm.visit,
                individual: vm.individual,
                residency: vm.residency,
                collectionDateTime: new Date().toISOString()
            },
            collectedByUuid: vm.collectedByUuid
        };
        BackendService.post("/inMigration", body).then(
            function (response) {
                console.log("yay! InMigrationController " + JSON.stringify(response));
            },
            function (response) {
                console.log("oops " + response.status);
            }
        );
    }
}