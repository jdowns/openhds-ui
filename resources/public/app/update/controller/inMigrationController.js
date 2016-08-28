angular.module('openHDS.view')
    .controller('InMigrationController',
                ['AppState', '$location', '$http', InMigrationController]);

function InMigrationController(AppState, $location, $http) {
    var vm = this;

    AppState.validateUser();

    vm.collectedByUuid = AppState.user.userId;
    vm.visit = AppState.currentVisit.visitId;
    vm.destination = AppState.currentVisit.locationId;
    //todo: get visit
    //todo: get location

    vm.date = new Date();

    function handleGenderResponse(response) {
        vm.codes = response.data;
    }

    vm.loadData = function() {
        $http.get('/api/projectcode/gender').then(handleGenderResponse);
    };

    function resetForm() {
        vm.firstName = null;
        vm.extId = null;
        vm.gender = null;
        vm.origin = null;
        vm.reason = null;
        vm.migrationDate = null;
        $location.url('/visit/inMigration');
    }

    function handleIndividualResponse(response) {
        var body = {
            individual: response.data,
            residency: vm.destination,
            origin: vm.origin,
            migrationType: 'INTERNAL_MIGRATION',
            migrationDate: vm.migrationDate,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };
        var handler;
        if (vm.areMoreIndividuals) {
            handler = resetForm;
        } else {
            handler = function() {
                $location.url('/visit');
            };
        }
        $http.post("/api/inMigration", body).then(handler);
    }

    vm.create = function() {
        var body = {
            firstName: vm.firstName,
            extId: vm.extId,
            gender: vm.gender,
            location: vm.destination,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };

        $http.post('/api/individual', body).then(handleIndividualResponse);

    };
}
