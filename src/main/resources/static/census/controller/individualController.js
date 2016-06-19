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
    vm.create = validateCreate;

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }
    function create() {
            var body = {
                individual: {
                    firstName: vm.firstName,
                    extId: vm.extId,
                    gender: vm.gender,
                    collectionDateTime: new Date().toISOString()
                },
                collectedByUuid: vm.collectedByUuid
            };
            BackendService.post("/individual", body).then(
                function (response) {
                    console.log("yay! " + JSON.stringify(response));
                },
                function (response) {
                    console.log("oops " + response.status);
                }
            );
        }
}