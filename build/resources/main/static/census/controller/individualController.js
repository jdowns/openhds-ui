angular.module('openHDS.view')
    .controller('IndividualController',
        ['BackendService', 'AppState', '$location', IndividualController]);

function IndividualController(BackendService, AppState, $location) {
    var vm = this;
    if (!AppState.user) {
        $location.url('/');
        return vm;
    }

    vm.collectedByUuid = AppState.user.userId;
    vm.areMoreIndividuals = false;
    vm.codes = AppState.genderCodes;
    vm.membershipCodes = AppState.membershipCodes;
    vm.residencyCodes = AppState.residencyCodes;
    vm.create = validateCreate;

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }
    function create() {
            vm.date = new Date().toISOString();
            var body = {
                individual: {
                    firstName: vm.firstName,
                    extId: vm.extId,
                    gender: vm.gender,
                    collectionDateTime: vm.date
                },
                collectedByUuid: vm.collectedByUuid
            };
            BackendService.post("/individual", body).then(
                function (response) {
                    var newIndividual = response.data;
                    if (AppState.individual) {
                        AppState.individual.push(newIndividual);
                    } else {
                        AppState.individual = [newIndividual];
                    }
                    var residencyBody = {
                        residency:
                        {
                            individual: newIndividual,
                            location: AppState.location,
                            startType: vm.residencyStartType,
                            startDate: vm.residencyStartDate,
                            collectionDateTime: vm.date},
                        collectedByUuid: vm.collectedByUuid};
                    BackendService.post("/residency", residencyBody).then(
                        function(response) {
                            console.log("Successfully submitted residency");
                        },
                        function(response) {
                            console.log("Failed submitting residency " + residencyBody);
                        }
                    );

                    var membershipBody = {
                        membership:
                        {
                            individual: newIndividual,
                            socialGroup: AppState.socialGroup,
                            startType: vm.membershipStartType,
                            startDate: vm.membershipStartDate,
                            collectionDateTime: vm.date},
                        collectedByUuid: vm.collectedByUuid}
                    BackendService.post("/membership", membershipBody).then(
                        function(response) {
                            console.log("Successfully submitted residency");
                        },
                        function(response) {
                            console.log("Failed submitting residency " + membershipBody);
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