angular.module('openHDS.view')
    .controller('DeathController',
                ['AppState', '$location', '$http', DeathController]);

function DeathController(AppState, $location, $http) {
    var vm = this;

    if (!AppState.validateUser()) {
        return vm;
    }

    vm.collectedByUuid = AppState.user.userId;
    vm.individual = AppState.currentVisit.activeIndividual.uuid.uuid;
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
        console.log("currentVisit");
        console.log(AppState.currentVisit);

        var body = {
            visit: vm.visit,
            individual: vm.individual,
            deathPlace: vm.deathPlace,
            deathCause: vm.deathCause,
            deathDate: vm.deathDate,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };
        $http.post("/api/death", body).then(AppState.handleNextUpdate);
    }
}
