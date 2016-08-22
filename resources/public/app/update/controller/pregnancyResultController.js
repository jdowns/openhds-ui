angular.module('openHDS.view')
    .controller('PregnancyResultController',
                ['AppState', '$location', '$http', PregnancyResultController]);

function PregnancyResultController(AppState, $location, $http) {
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
        $http.get('/api/projectcode/pregnancyResultType')
            .then(
                function(response) {
                    console.log("got pregnancy result types: "
                                + JSON.stringify(response.data));
                    vm.codes = response.data;
                },
                function(response){
                    console.log("failed to get pregnancy result types: "
                                + JSON.stringify(response));
                });
    }

    function create() {
        var body = {
            visit: vm.visit,
            type: vm.type,
            pregnancyOutcome: vm.pregnancyOutcome,
            child: vm.child,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };

        $http.post("/api/pregnancyResult", body).then(
            function (response) {
                console.log("Successfully created pregnancy result event: " +
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
