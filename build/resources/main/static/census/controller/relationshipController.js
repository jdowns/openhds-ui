angular.module('openHDS.view')
    .controller('RelationshipController',
        ['BackendService', 'AppState', '$location', RelationshipController]);

function RelationshipController(BackendService, AppState, $location) {
    var vm = this;
    if (!AppState.user) {
        $location.url('/');
        return vm;
    }

    vm.collectedByUuid = AppState.user.userId;
    vm.headOfHousehold = AppState.individuals[0];
    vm.individuals = AppState.individuals.slice(1);
    vm.individualB = vm.individuals.pop();
    vm.create = validateCreate;

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }

    function create() {
        vm.date = new Date().toISOString();
        var body = {
            relationship: {
                individualA: vm.headOfHousehold,
                individualB: vm.individualB,
                relationshipType: vm.relationshipType,
                startDate: vm.startDate,
                collectionDateTime: vm.date
            },
            collectedByUuid: vm.collectedByUuid
        };
        BackendService.post("/relationship", body).then(
            function (response) {
                if(vm.individuals.length == 0) {
                    $location.url('/fieldworkerHome');
                } else {
                    vm.individualB = vm.individuals.pop();
                }
                console.log("yay! relationship " + JSON.stringify(response));
            },
            function (response) {
                console.log("oops " + response.status);
            }
        );
    }
}