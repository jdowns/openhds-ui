angular.module('openHDS.view')
    .controller('OutMigrationController',
                ['AppState', '$location', '$http', OutMigrationController]);

function OutMigrationController(AppState, $location, $http) {
    var vm = this;

    //AppState.user; //this will be the login check


    vm.collectedByUuid = AppState.user.userId;
    vm.individual = AppState.
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

        $http.post("/api/outMigration", body).then(
            function (response) {
                console.log("Successfully created out migration event: " +
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
                console.log("Failed to create out migration event " + response.status);
            }
        );
    }
}
