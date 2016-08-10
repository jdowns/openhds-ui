angular.module('openHDS.view')
    .controller('LocationController',
        ['LocationClient', 'AppState', '$location', LocationController]);

function Location(name, extId, type, date, collectedBy) {
    this.collectedByUuid = collectedBy;
    this.location = {
        name: name,
        extId: extId,
        type: type,
        collectionDateTime: date
    };
}



function LocationController(LocationClient, AppState, $location) {
    var vm = this;

    if (!AppState.user) {
        $location.url('/');
        return vm;
    }

    vm.collectedByUuid = AppState.user.userId;
    vm.create = validateCreate;
    vm.loadData = loadData;

    function loadData() {
        AppState.loadData();
    }
    
    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }

    function create() {
        vm.date = new Date().toISOString(); // for testing
        var body = new Location(vm.name, vm.extId, vm.type, vm.date, vm.collectedByUuid);

        LocationClient.create(body).then(
            function (response) {
                AppState.location = response.data;
                $location.url("/socialGroup/new");
            },
            function (response) {
                console.log("Something went wrong! " + response.status +
                            " Submitted: " + JSON.stringify(body));
            }
        );
    }
}