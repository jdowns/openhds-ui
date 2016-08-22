angular.module('openHDS.view')
    .controller('PregnancyObservationController',
                ['AppState', '$location', '$http', PregnancyObservationController]);

function PregnancyObservationController(AppState, $location, $http) {
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
            expectedDeliveryDate: vm.expectedDeliveryDate,
            pregnancyDate: vm.pregnancyDate,
            mother: vm.mother,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };

        $http.post("/api/pregnancyObservation", body).then(
            function (response) {
                console.log("Successfully created pregnancy observation event: " +
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
                console.log("Failed to create pregnancy observation event " + response.status);
            }
        );
    }
}
