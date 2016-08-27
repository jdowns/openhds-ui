angular.module('openHDS.view')
    .controller('RelationshipController',
                ['AppState', '$location', '$http',
                 RelationshipController]);

function RelationshipController(AppState,
                                $location, $http) {
    var vm = this;
    AppState.validateUser();

    vm.collectedByUuid = AppState.user.userId;
    vm.headOfHousehold = AppState.individual[0];
    vm.individuals = AppState.individual.slice(1);
    vm.individualB = vm.individuals.pop();
    vm.date = new Date().toISOString();

    function handleCodesResponse(response) {
        vm.codes = response.data;
    }

    function handleRelationshipResponse(response) {
        if (vm.individuals.length === 0) {
            $location.url('/fieldworkerHome');
        } else {
            vm.individualB = vm.individuals.pop();
        }
    }

    vm.loadData = function() {
        $http.get('/api/projectcode/relationshipType').then(handleCodesResponse);
    };

    vm.create = function() {
        var body = {
            individualA: vm.headOfHousehold,
            individualB: vm.individualB,
            relationshipType: vm.relationshipType,
            startDate: vm.startDate,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };
        $http.post("/api/relationship", body).then(handleRelationshipResponse);
    };
}
