angular.module('openHDS.view')
    .controller('LocationController',
        ['BackendService', 'AppState', '$location', LocationController]);

function LocationController(BackendService, AppState, $location) {
    var vm = this;

    if (!AppState.user) {
        $location.url('/');
        return vm;
    }

    vm.collectedByUuid = AppState.user.userId;
    vm.create = validateCreate;
    vm.loadData = loadData;

    function loadData() {
        BackendService.get("/projectCode/locationType")
            .then(
                function (response) {
                    vm.codes = response.data;
                },
                function (response) {
                    console.log("Unable to fetch project codes! " + JSON.stringify(response));
                }
            );
        BackendService.get("/locationHierarchy")
            .then(
                function (response) {
                    vm.hierarchies = response.data;
                },
                function (response) {
                    console.log("Unable to fetch location hierarchies! " + JSON.stringify(response));
                }
            );
    }
    
    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }

    function create() {
        var body = {
            location: {
                name: vm.name,
                extId: vm.extId,
                type: vm.type,
                collectionDateTime: new Date().toISOString()
            },
            collectedByUuid: vm.collectedByUuid
        };
        BackendService.post("/location", body).then(
            function (response) {
                console.log("yay! " + JSON.stringify(response));
            },
            function (response) {
                console.log("oops " + response.status);
            }
        );
    }
}