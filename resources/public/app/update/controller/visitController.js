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
    var locationUrl = "/api/location";
    var individualUrl = "/api/individual";
    var visitUrl = "/api/visit";
    var nextPage = "/visit";
    var loginPage = "/";

    var vm = this;
    if (!AppState.user) {
        $location.url(loginPage);
    }

    vm.collectedByUuid = AppState.user.userId;
    vm.create = validateCreate;
    vm.date = new Date().toISOString();
    vm.loadData = loadData;
    vm.inMigrations = false;
    return vm;

    /* Private */
    function loadData() {
        $http.get(locationUrl).then(locationsResponse);
    }

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

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }

    function create() {
        var body = new VisitModel(vm);
        $http.post(visitUrl, body).then(visitResponse);
    }
}
