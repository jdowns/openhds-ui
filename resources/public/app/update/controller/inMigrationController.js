angular.module('openHDS.view')
    .controller('InMigrationController',
                ['AppState', '$location', '$http', InMigrationController]);

function InMigrationController(AppState, $location, $http) {
    var vm = this;

    AppState.validateUser();

    vm.collectedByUuid = AppState.user.userId;
    vm.individual = AppState.currentVisit.activeIndividual.uuid;
    vm.date = new Date();

    vm.create = function() {
        var body = {
            origin: vm.origin,
            reason: vm.reason,
            migrationType: vm.migrationType,
            migrationDate: vm.migrationDate,
            visit: vm.visit,
            individual: vm.individual,
            residency: vm.residency,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };

        $http.post("/api/inMigration", body).then(AppState.handleNextUpdate);
    };
}
