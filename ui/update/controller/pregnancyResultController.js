angular.module('openHDS.view')
    .controller('PregnancyResultController',
                ['AppState', '$location', '$http', PregnancyResultController]);

function PregnancyResultController(AppState, $location, $http) {
    var vm = this;

    AppState.validateUser();

    vm.collectedByUuid = AppState.user.userId;
    vm.individual = AppState.currentVisit.activeIndividual.uuid;
    vm.pregnancyOutcome = AppState.currentVisit.pregnancyOutcome;
    vm.date = new Date();

    function handleCodes(response) {
        vm.codes = response.data;
    }

    function handleGenderCodes(response) {
        vm.genderCodes = response.data;
    }

    vm.loadData = function() {
        $http.get('/api/projectcode/pregnancyResultType').then(handleCodes);
        $http.get('/api/projectcode/gender').then(handleGenderCodes);
    };

    vm.create = function() {
        var body = {
            visit: vm.visit,
            type: vm.type,
            pregnancyOutcome: vm.pregnancyOutcome,
            child: vm.child,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };

        $http.post("/api/pregnancyResult", body).then(AppState.handleNextUpdate);
    };
}
