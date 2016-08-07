angular.module('openHDS.view')
    .controller('RelationshipController',
                ['BackendService', 'AppState', '$location', '$http',
                 RelationshipController]);

function RelationshipController(BackendService, AppState,
                                $location, $http) {
    var vm = this;
    if (!AppState.user) {
        $location.url('/');
        return vm;
    }

    vm.collectedByUuid = AppState.user.userId;
    vm.headOfHousehold = AppState.individual[0];
    vm.individuals = AppState.individual.slice(1);
    vm.individualB = vm.individuals.pop();
    vm.create = validateCreate;
    vm.loadData = loadData;

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }

    function loadData() {
        $http.get('/api/projectcode/relationshipType')
            .then(
                function(response) {
                    vm.codes = response.data
                },
                function(response) {
                    console.log("failed to get relationship codes"
                                + JSON.stringify(response));
                });
    }

    function create() {
        vm.date = new Date().toISOString();
        var body = {
            individualA: vm.headOfHousehold,
            individualB: vm.individualB,
            relationshipType: vm.relationshipType,
            startDate: vm.startDate,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };
        $http.post("/api/relationship", body).then(
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
