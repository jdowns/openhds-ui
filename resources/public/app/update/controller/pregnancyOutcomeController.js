angular.module('openHDS.view')
    .controller('PregnancyOutcomeController',
                ['AppState', '$location', '$http', PregnancyOutcomeController]);

function PregnancyOutcomeController(AppState, $location, $http) {
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

    function handlePregnancyOutcome(response) {
        AppState.currentVisit.pregnancyOutcome = response.data;
        $location.url('/visit/pregnancyResult');
    }

    function create() {
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
    }
}
