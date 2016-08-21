// For creating new location hierarchies
angular.module('openHDS.view')
    .controller('LocationHierarchyController',
                ['AppState', '$location', '$http', LocationHierarchyController]);

function LocationHierarchyController(AppState, $location, $http) {
    var vm = this;

    vm.date = new Date().toISOString();
}
