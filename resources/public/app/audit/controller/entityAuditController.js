angular.module('openHDS.view')
    .controller('EntityAuditController',
                ['AppState', '$location', '$http', EntityAuditController]);

function EntityAuditController(AppState, $location, $http) {
    var vm = this;
    console.log('initing entity controller...');

    vm.show = function(id) {
        vm.visible = id;
    };

    return vm;
}
