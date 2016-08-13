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
        $http.post("/api/visit", body).then(
            function(response) {
                $location.url('/visit');
                $http.get("/api/individual?location=" + vm.location).then(
                    function(response) {

                    },
                    function(response) {

                    }
                );
                console.log("Visit created. " + JSON.stringify(response));
            },
            function(response) {
                console.log("Error creating visit. " + response.status);
            }
        );
    }
}
