angular.module('openHDS.view')
    .controller('PregnancyOutcomeController',
                ['AppState', '$location', '$http', PregnancyOutcomeController]);

function PregnancyOutcomeController(AppState, $location, $http) {
    var vm = this;

    AppState.validateUser();

    vm.collectedByUuid = AppState.user.userId;
    vm.mother = AppState.currentVisit.activeIndividual.uuid.uuid;
    vm.visit = AppState.currentVisit.visitId;
    vm.date = new Date();

    function handlePregnancyOutcome(response) {
        AppState.currentVisit.pregnancyOutcome = response.data;
        $location.url('/visit/pregnancyResult');
    }

    vm.create = function() {
        var body = {
            visit: vm.visit,
            outcomeDate: vm.outcomeDate,
            mother: vm.mother,
            father: vm.father,
            visit: vm.visit,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };

        $http.post("/api/pregnancyOutcome", body).then(handlePregnancyOutcome);
    };
}
