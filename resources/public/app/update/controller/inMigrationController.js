angular.module('openHDS.view')
    .controller('InMigrationController',
                ['AppState', '$location', '$http', InMigrationController]);

function InMigrationController(AppState, $location, $http) {
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

        $http.post("/api/inMigration", body).then(
            function (response) {
                console.log("Successfully created in migration event: " +
                            JSON.stringify(response.data));
                var nextUpdate = AppState.currentUpdates.pop();
                if (nextUpdate === "death") {
                    $location.url('/update/death');
                }
                if (nextUpdate === "outMigration") {
                    $location.url('/update/outMigration');
                }
                else if (nextUpdate === "pregnancyObservation") {
                    $location.url('/update/pregnancyObservation');
                }
                else if (nextUpdate === "pregnancyOutcome") {
                    $location.url('/update/pregnancyOutcome');
                }
                else if (nextUpdate === "pregnancyResult") {
                    $location.url('/update/pregnancyResult');
                }
                else {
                    $location.url('/visit');
                }
            },
            function (response) {
                console.log("Failed to create in migration event " + response.status);
            }
        );
    }
}
