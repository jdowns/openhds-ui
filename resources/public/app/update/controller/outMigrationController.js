angular.module('openHDS.view')
    .controller('OutMigrationController',
                ['AppState', '$location', '$http', OutMigrationController]);

function OutMigrationController(AppState, $location, $http) {
    var vm = this;

    //AppState.user; //this will be the login check
    vm.collectedByUuid = AppState.user.userId;
    vm.individual = AppState.currentVisit.activeIndividual.uuid;
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
            origin: vm.origin,
            reason: vm.reason,
            migrationDate: vm.migrationDate,
            individual: vm.individual,
            residency: vm.residency,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };

        $http.post("/api/outMigration", body).then(AppState.handleNextUpdate);
    }
}
