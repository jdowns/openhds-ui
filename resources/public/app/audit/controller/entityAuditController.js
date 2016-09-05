angular.module('openHDS.view')
    .controller('EntityAuditController',
                ['AppState', '$location', '$http', EntityAuditController]);


function EntityAuditController(AppState, $location, $http) {

    var vm = this;
    return vm;

    vm.show = function(id) {
        vm.visible = id;
        if (vm.currentHierarchy) {
            getEntitiesByHierarchy(vm.currentHierarchy);
        }
    };

    vm.updateRootHierarchy = function() {
        var selected = vm.selectedRootHierarchy;
        vm.hierarchiesByLevel = [vm.locationHierarchies[selected]];
        vm.locationPath = [selected];
    };

    vm.updateHierarchy = function(hierarchyLevel) {
        var selectedUuid = vm.locationPath[hierarchyLevel];
        var nextHierarchies = vm.locationHierarchies[selectedUuid];

        if (nextHierarchies === undefined) {
            vm.currentHierarchy = selectedUuid;
            getEntitiesByHierarchy(selectedUuid);

            return;
        }
        vm.hierarchiesByLevel.push(nextHierarchies);
    };

    function getEntitiesByHierarchy(uuid) {
        $http.get('/api/byHierarchy/' + vm.visible + '/' + uuid)
            .then(responseHandler('locations'));
    }

    function responseHandler(targetField) {
        return function(response) {
            vm[targetField] = response.data;
        };
    }

    function handleSubmitResult(result) {
        vm.lastSubmittedEntity = {
            uuid: result.data,
            type: vm.visible
        };
    }

    function handleLocationHierarchy(response) {
        vm.locationHierarchies = response.data;
        vm.root = vm.locationHierarchies[""];
    }

    vm.loadData = function() {
        $http.get('/api/locationHierarchy').then(handleLocationHierarchy);
    };

    vm.search = function(uuid) {
        $http.get('/api/' + vm.visible + '/' + uuid)
            .then(responseHandler('entity'));
    };

    vm.submit = function() {
        $http.post('/api/' + vm.visible + "/" + vm.entity.uuid, vm.entity)
            .then(handleSubmitResult);
    }

    return vm;
}
