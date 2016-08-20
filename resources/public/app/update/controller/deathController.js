angular.module('openHDS.view')
    .controller('DeathController',
                ['AppState', '$location', '$http', DeathController]);

function DeathController(AppState, $location, $http) {
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
            individual: vm.individual,
            deathPlace: vm.deathPlace,
            deathCause: vm.deathCause,
            deathDate: vm.deathDate,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };
        $http.post("/api/death", body).then(
            function (response) {
                console.log("Successfully created death event: " +
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
                console.log("Failed to create death event " + response.status);
            }
        );
    }
}
