angular.module('openHDS.view')
    .controller('OutMigrationController',
                ['AppState', '$location', '$http', OutMigrationController]);

function OutMigrationController(AppState, $location, $http) {
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
            outMigration:
            {
                visit: vm.visit,
                origin: vm.origin,
                reason: vm.reason,
                migrationDate: vm.migrationDate,
                individual: vm.individual,
                residency: vm.residency,
                collectionDateTime: new Date().toISOString()
            },
            collectedByUuid: vm.collectedByUuid
        };
        $http.post("/api/outMigration", body).then(
            function(response) {
                console.log("yay! OutMigrationController " + JSON.stringify(response));
            },
            function(response) {
                console.log("oops " + response.status);
            }
        );
    }
}
