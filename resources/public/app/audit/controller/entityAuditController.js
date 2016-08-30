angular.module('openHDS.view')
    .controller('EntityAuditController',
                ['AppState', '$location', '$http', EntityAuditController]);

function EntityAuditController(AppState, $location, $http) {
    var vm = this;

    vm.show = function(id) {
        vm.visible = id;
    };

    function handleSearchResult(result) {
        vm.entity = result.data;
    }

    vm.search = function(uuid) {
        $http.get('/api/search/' + vm.visible + '/' + uuid)
            .then(handleSearchResult);
    };

    return vm;
}
