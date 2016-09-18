angular.module('openHDS.view')
    .controller('UserController',
        ['$http', 'AppState', '$location', UserController]);

function UserController($http, AppState, $location) {
    //TODO: Implement This!
    var vm = this;
    if (!AppState.user) {
        $location.url('/');
        return vm;
    }

    vm.create = validateCreate;

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }
    function create() {
        var body = {
            extId: vm.extId,
            collectionDateTime: new Date().toISOString(),
            collectedByUuid: vm.collectedByUuid
        };
        $http.post("/user", body).then(
            function(response) {

            },
            function(response) {

            }
        );
    }
}
