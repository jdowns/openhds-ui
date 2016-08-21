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
        $http.get('/api/locationHierarchyLevel')
            .then(function(response) {
                console.log("Got hierarchy level: " + JSON.stringify(response.data));
                vm.hierachyLevels = response.data;
            }, function(response) {
                console.log("Failed to get location hierarchy levels");
            });

        $http.get('/api/locationHierarchy')
            .then(
                function(response) {
                    vm.locationHierarchies = response.data;
                    vm.root = vm.locationHierarchies[""];
                },
                function(response) {
                    console.log("failed to get hierarchies: " + JSON.stringify(response));
                });

        $http.get('/api/projectcode/locationType')
            .then(
                function(response) {
                    console.log("got location types: "
                                + JSON.stringify(response.data));
                    vm.codes = response.data;
                },
                function (response) {
                    console.log("failed to get locationTypes: "
                                + JSON.stringify(response));
                });
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
        console.log("submitting");
        console.log(body);
        console.log(vm.locationHierarchies);

        $http.post("/api/location", body)
            .then(
                function (response) {
                    console.log("Got location response" +
                                response.data);
                    AppState.location = response.data;
                    $location.url("/socialGroup/new");
                },
                function (response) {
                    console.log("Something went wrong! " +
                                response.status +
                                " Submitted: " +
                                JSON.stringify(body));
                }
        );
    }
}
