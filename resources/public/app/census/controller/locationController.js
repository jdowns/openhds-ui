angular.module('openHDS.view')
    .controller('LocationController',
                ['AppState', '$location', '$http', LocationController]);

function LocationController(AppState, $location, $http) {
    var vm = this;

    AppState.validateUser();

    vm.collectedByUuid = AppState.user.userId;
    vm.date = new Date().toISOString();

    vm.updateRootHierarchy = function() {
        var selected = vm.selectedRootHierarchy;
        vm.hierarchiesByLevel = [vm.locationHierarchies[selected]];
        vm.locationPath = [selected];
    };

    vm.updateHierarchy = function(hierarchyLevel) {
        var selectedUuid = vm.locationPath[hierarchyLevel];
        var nextHierarchies = vm.locationHierarchies[selectedUuid];

        if (nextHierarchies === undefined) {
            return;
        }
        vm.hierarchiesByLevel.push(nextHierarchies);
    };

    vm.loadData = function() {
        $http.get('/api/locationHierarchyLevel').then(handleHierarchyLevels);
        $http.get('/api/locationHierarchy').then(handleLocationHierarchy);
        $http.get('/api/projectcode/locationType').then(handleLocationTypes);
    };

    vm.create = function() {
        var body = {
            name: vm.name,
            extId: vm.extId,
            locationHierarchyUuid: vm.locationPath[vm.locationPath.length-1],
            type: vm.type,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };
        $http.post("/api/location", body).then(handleLocationSubmit);
    };

    function handleHierarchyLevels(response) {
        vm.hierarchyLevels = response.data;
    }

    function handleLocationHierarchy(response) {
        vm.locationHierarchies = response.data;
        vm.root = vm.locationHierarchies[""];
    }

    function handleLocationTypes(response) {
        vm.codes = response.data;
    }

    function handleLocationSubmit(response) {
        AppState.location = response.data;
        $location.url("/socialGroup/new");
    }

}
