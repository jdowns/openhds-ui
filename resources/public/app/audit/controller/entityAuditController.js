angular.module('openHDS.view')
    .controller('EntityAuditController',
                ['AppState', '$location', '$http', EntityAuditController]);

function EntityAuditController(AppState, $location, $http) {
    var vm = this;

    vm.show = function(id) {
        vm.visible = id;
        console.log(vm.visible);
    };

    function handleSearchResult(result) {
        console.log("result");
        console.log(result.data);
        vm.entity = result.data;
    }

    vm.search = function(uuid) {
        $http.get('/api/' + vm.visible + '/' + uuid)
            .then(handleSearchResult);
    };

    return vm;
}
