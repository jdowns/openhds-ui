angular.module('openHDS.view')
    .controller('VisitController',
                ['AppState', '$location', '$http', VisitController]);

function VisitModel(vm) {
    return {
        extId: vm.extId,
        location: vm.location,
        visitDate: vm.visitDate,
        collectionDateTime: vm.date,
        collectedByUuid: vm.collectedByUuid
    };
}

function VisitController(AppState, $location, $http) {
    AppState.validateUser();

    var locationUrl = "/api/location";
    var individualUrl = "/api/individual";
    var visitUrl = "/api/visit";
    var nextPage = "/visit";
    var loginPage = "/";

    var vm = this;

    vm.collectedByUuid = AppState.user.userId;
    vm.date = new Date().toISOString();
    vm.inMigrations = false;

    /* Private */
    vm.loadData = function() {
        $http.get(locationUrl).then(locationsResponse);
    };

    function locationsResponse(response) {
        vm.locations = response.data;
    }

    function individualResponse(response) {
        AppState.currentVisit.individuals = response.data;
        $location.url(nextPage);
    }

    function visitResponse(response) {
        AppState.currentVisit = {
            inMigrations: vm.inMigrations,
            visitId: response.data,
            locationId: vm.location
        };

        $http.get(individualUrl + "/" + vm.location).then(individualResponse);
    }

    vm.create = function() {
        var body = new VisitModel(vm);
        $http.post(visitUrl, body).then(visitResponse);
    };

    return vm;
}
