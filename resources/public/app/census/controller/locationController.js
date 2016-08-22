angular.module('openHDS.view')
    .controller('LocationController',
                ['AppState', '$location', '$http', LocationController]);

function Location(name, extId, type, date, collectedBy) {
    this.collectedByUuid = collectedBy;
    this.location = {
        name: name,
        extId: extId,
        type: type,
        collectionDateTime: date
    };
}

function LocationController(AppState, $location, $http) {
    var vm = this;

    if (!AppState.user) {
        $location.url('/');
        return vm;
    }

    vm.collectedByUuid = AppState.user.userId;
    vm.create = validateCreate;
    vm.loadData = loadData;
    vm.date = new Date().toISOString();
    vm.updateRootHierarchy = function() {
        var selected = vm.selectedRootHierarchy;
        vm.hierarchies = [vm.locationHierarchies[selected]];
        vm.locationPath = [selected];
    };

    vm.updateHierarchy = function(index) {
        var selected = vm.locationHierarchies[index];
        vm.locationPath.push(selected);
        if (vm.locationHierarchies[selected] === undefined) {
            return;
        }
        vm.hierarchies = vm.hierarchies.concat([vm.locationHierarchies[selected]]);
        console.log("HIERARCHIES:");
        console.log(vm.hierarchies);
    };

    function loadData() {
        $http.get('/api/locationHierarchyLevel').then(handleHierarchyLevels);
        $http.get('/api/locationHierarchy').then(handleLocationHierarchy);
        $http.get('/api/projectcode/locationType').then(handleLocationTypes);
    }

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

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
        else {
            console.log("invalid form");
        }
    }

    function create() {
        var body = {
            name: vm.name,
            extId: vm.extId,
            locationHierarchyUuid: vm.locationPath[vm.locationPath.length-1],
            type: vm.type,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };
        $http.post("/api/location", body).then(handleLocationSubmit);
    }
}
