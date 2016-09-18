angular.module('openHDS.view')
    .controller('IndividualController',
                ['AppState', '$location', '$http', IndividualController]);

function IndividualController(AppState, $location, $http) {
    var vm = this;

    AppState.validateUser();

    vm.collectedByUuid = AppState.user.userId;
    vm.areMoreIndividuals = false;
    vm.create = create;
    vm.loadData = loadData;
    vm.location = AppState.location;
    vm.date = new Date().toISOString();

    function loadData() {
        $http.get('/api/projectcode/gender').then(handleGenderResponse);
        $http.get('/api/projectcode/membershipType').then(handleMembershipResponse);
        $http.get('/api/projectcode/migrationType').then(handleMigrationResponse);
    }

    function create() {
        var body = {
            firstName: vm.firstName,
            extId: vm.extId,
            gender: vm.gender,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid,
            location: vm.location
        };
        $http.post("/api/individual", body).then(handleIndividualResponse);
    }

    function handleGenderResponse(response) {
        vm.codes = response.data; // TODO: rename genderCodes
    }

    function handleMembershipResponse(response) {
        vm.membershipCodes = response.data;
    }

    function handleMigrationResponse(response) {
        vm.residencyCodes = response.data;
    }

    function handleIndividualResponse(response) {
        var newIndividual = response.data;
        //TODO: save name fields to app state for later forms
        if (AppState.individual) {
            AppState.individual.push(newIndividual);
        } else {
            AppState.individual = [newIndividual];
        }

        createResidency(newIndividual);
        createMembership(newIndividual);

        if (!vm.areMoreIndividuals) {
            $location.url('/relationship/new');
        }
    }

    function createResidency(individualId) {
        var residencyBody = {
            individual: individualId,
            location: AppState.location,
            startType: vm.residencyStartType,
            startDate: vm.residencyStartDate,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };
        $http.post("/api/residency", residencyBody);
    }

    function createMembership(individualId) {
        var membershipBody = {
            individual: individualId,
            socialGroup: AppState.socialGroup,
            startType: vm.membershipStartType,
            startDate: vm.membershipStartDate,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };

        $http.post("/api/membership", membershipBody);
    }


}
