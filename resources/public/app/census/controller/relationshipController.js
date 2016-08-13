angular.module('openHDS.view')
    .controller('RelationshipController',
                ['AppState', '$location', '$http',
                 RelationshipController]);

function RelationshipController(AppState,
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
    vm.date = new Date().toISOString();

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }

    function loadData() {
        $http.get('/api/projectcode/relationshipType')
            .then(
                function(response) {
                    vm.codes = response.data;
                },
                function(response) {
                    console.log("failed to get relationship codes"
                                + JSON.stringify(response));
                });
    }

    function create() {

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
            },
            function (response) {
                console.log("Failed to submit relationship " + response.status);
            }
        );
    }
}
