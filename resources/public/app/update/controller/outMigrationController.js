angular.module('openHDS.view')
    .controller('OutMigrationController',
                ['AppState', '$location', '$http', OutMigrationController]);

function OutMigrationController(AppState, $location, $http) {
    var vm = this;

    AppState.validateUser();

    vm.collectedByUuid = AppState.user.userId;
    vm.individual = AppState.currentVisit.activeIndividual.uuid.uuid;
    vm.visit = AppState.currentVisit.visitId;
    vm.date = new Date();

    vm.create = function() {
        var body = {
            visit: vm.visit,
            destination: vm.destination,
            reason: vm.reason,
            migrationDate: vm.migrationDate,
            individual: vm.individual,
            //residency: vm.residency,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };

        $http.post("/api/outMigration", body).then(AppState.handleNextUpdate);
    };
}
