angular.module('openHDS.view')
    .controller('PregnancyObservationController',
                ['AppState', '$location', '$http', PregnancyObservationController]);

function PregnancyObservationController(AppState, $location, $http) {
    var vm = this;

    if (!AppState.validateUser()) {
        return vm;
    }

    vm.collectedByUuid = AppState.user.userId;
    vm.mother = AppState.currentVisit.activeIndividual.uuid.uuid;
    vm.visit = AppState.currentVisit.visitId;
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

        $http.post("/api/pregnancyObservation", body).then(AppState.handleNextUpdate);
    }
}
