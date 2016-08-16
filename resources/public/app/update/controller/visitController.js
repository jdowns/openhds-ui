angular.module('openHDS.view')
    .controller('VisitController',
                ['AppState', '$location', '$http', VisitController]);

function VisitController(AppState, $location, $http) {
    var vm = this;
    if (!AppState.user) {
        $location.url('/');
        return vm;
    }

    vm.collectedByUuid = AppState.user.userId;
    vm.create = validateCreate;
    vm.date = new Date().toISOString();
    vm.loadData = loadData;

    function loadData() {
        $http.get("/api/location").then
        (
            function(response){
                console.log("Got locations. " + JSON.stringify(response.data));
                vm.locations = response.data;
            },
            function(response){
                console.log("Unable to get locations. " + response.status);
            });
    }
    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }
    function create() {

        var body = {
            extId: vm.extId,
            location: vm.location,
            visitDate: vm.visitDate,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid};
        console.log("creating visit " + JSON.stringify(body));
        $http.post("/api/visit", body).then(
            function(response) {
                console.log("Visit created. " + JSON.stringify(response));
                $location.url('/visit');
                AppState.currentVisit = response.data;
                $http.get("/api/individual?location=" + vm.location).then(
                    function(response) {

                    },
                    function(response) {

                    }
                );

            },
            function(response) {
                console.log("Error creating visit. " + response.status);
            }
        );
    }
}
