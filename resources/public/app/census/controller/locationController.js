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

    function loadData() {
        $http.get('/api/projectcode/locationType')
            .then(
                function(response) {
                    console.log("got data: "+ JSON.stringify(response.data));
                    vm.codes = response.data;
                },
                function (response) {

                });
    }

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
        else {
            console.log("invalid form...");
        }
    }

    function create() {
        console.log("creating...");
        vm.date = new Date().toISOString(); // for testing
        var body = {
            name: vm.name,
            extId: vm.extId,
            type: vm.type,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid
        };

        $http.post("/api/location", body)
            .then(
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
