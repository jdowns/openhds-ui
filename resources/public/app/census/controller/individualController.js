angular.module('openHDS.view')
    .controller('IndividualController',
                ['AppState', '$location', '$http', IndividualController]);

function IndividualController(AppState, $location, $http) {
    var vm = this;
    if (!AppState.user) {
        $location.url('/');
        return vm;
    }

    vm.collectedByUuid = AppState.user.userId;
    vm.areMoreIndividuals = false;
    vm.create = validateCreate;
    vm.loadData = loadData;
    vm.location = AppState.location;
    vm.date = new Date().toISOString();


    function loadData() {
        $http.get('/api/projectcode/gender')
            .then(
                function(response) {
                    console.log("got data: " + JSON.stringify(response.data));
                    vm.codes = response.data;
                },
                function(response) {console.log("failed to get gender codes");});
        $http.get('/api/projectcode/membershipType')
            .then(
                function(response) {
                    console.log("got data: " + JSON.stringify(response.data));
                    vm.membershipCodes = response.data;
                },
                function(response) {console.log("failed to get membership codes");});
        $http.get('/api/projectcode/migrationType')
            .then(
                function(response) {
                    console.log("got data: " + JSON.stringify(response.data));
                    vm.residencyCodes = response.data;
                },
                function(response) {console.log("failed to get residency codes");});
    }

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
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
        $http.post("/api/individual", body).then(
                function (response) {
                    var newIndividual = response.data;
                    //TODO: save user identifiable fields
                    if (AppState.individual) {
                        AppState.individual.push(newIndividual);
                    } else {
                        AppState.individual = [newIndividual];
                    }
                    console.log("got individuals " + JSON.stringify(AppState.individual));
                    var residencyBody = {
                        individual: newIndividual,
                        location: AppState.location,
                        startType: vm.residencyStartType,
                        startDate: vm.residencyStartDate,
                        collectionDateTime: vm.date,
                        collectedByUuid: vm.collectedByUuid
                    };
                    $http.post("/api/residency", residencyBody).then(
                        function(response) {
                            console.log("Successfully submitted residency");
                        },
                        function(response) {
                            console.log("Failed submitting residency "
                                        + JSON.stringify(residencyBody));
                            console.log("response was: " + JSON.stringify(response));
                        }
                    );

                    var membershipBody = {
                        individual: newIndividual,
                        socialGroup: AppState.socialGroup,
                        startType: vm.membershipStartType,
                        startDate: vm.membershipStartDate,
                        collectionDateTime: vm.date,
                        collectedByUuid: vm.collectedByUuid
                    };
                    $http.post("/api/membership", membershipBody).then(
                        function(response) {
                            console.log("Successfully submitted membership");
                        },
                        function(response) {
                            console.log("Failed submitting membership "
                                        + JSON.stringify(membershipBody));
                            console.log("response was " + JSON.stringify(response));
                        }
                    );

                    if (!vm.areMoreIndividuals) {
                        $location.url('/relationship/new');
                    }
                },
                function (response) {
                    console.log("oops " + response.status);
                }
            );
        }
}
