angular.module('openHDS.view')
    .controller('RelationshipController',
        ['BackendService', 'AppState', '$location', RelationshipController]);

function RelationshipController(BackendService, AppState, $location) {
    var vm = this;
    if (!AppState.user) {
        $location.url('/');
        return vm;
    }
    BackendService.get("/projectCode/relationshipType")
        .then(
            function(response) {
                console.log(JSON.stringify(response));
                vm.codes = response.data;
            },
            function(response) {
                console.log("Unable to fetch project codes! " + JSON.stringify(response));
            }
        );
    vm.collectedByUuid = AppState.user.userId;
    vm.create = validateCreate;

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }
    function create(formValid) {
        if (formValid) {
            var body = {
                relationship: {
                    individualA: vm.individualA,
                    individualB: vm.individualB,
                    relationshipType: vm.relationshipType,
                    startDate: vm.startDate,
                    collectionDateTime: new Date().toISOString()
                },
                collectedByUuid: vm.collectedByUuid
            };
            BackendService.post("/relationship", body).then(
                function (response) {
                    console.log("yay! relationship " + JSON.stringify(response));
                },
                function (response) {
                    console.log("oops " + response.status);
                }
            );
        }
    }
}