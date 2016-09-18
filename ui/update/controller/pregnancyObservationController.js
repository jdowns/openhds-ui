angular.module('openHDS.view')
    .controller('PregnancyObservationController',
                ['AppState', '$location', '$http', PregnancyObservationController]);

function PregnancyObservationController(AppState, $location, $http) {
    var vm = this;

    AppState.validateUser();

    vm.collectedByUuid = AppState.user.userId;
    vm.mother = AppState.currentVisit.activeIndividual.uuid.uuid;
    vm.visit = AppState.currentVisit.visitId;
    vm.date = new Date();

    vm.create = function() {
        var body = {
            visit: vm.visit,
            expectedDeliveryDate: vm.expectedDeliveryDate,
            pregnancyDate: vm.pregnancyDate,
            mother: vm.mother,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };

        $http.post("/api/pregnancyObservation", body).then(AppState.handleNextUpdate);
    };
}
