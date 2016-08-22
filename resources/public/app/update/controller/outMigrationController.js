angular.module('openHDS.view')
    .controller('OutMigrationController',
                ['AppState', '$location', '$http', OutMigrationController]);

function OutMigrationController(AppState, $location, $http) {
    var vm = this;

    if (!AppState.validateUser()) {
        return vm;
    }

    vm.collectedByUuid = AppState.user.userId;
    vm.individual = AppState.currentVisit.activeIndividual.uuid.uuid;
    vm.visit = AppState.currentVisit.visitId;
    vm.create = validateCreate;
    vm.date = new Date();
    vm.loadData = loadData;

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }

    function loadData() {

    }

    function create() {
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
    }
}
