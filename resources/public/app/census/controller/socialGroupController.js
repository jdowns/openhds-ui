angular.module('openHDS.view')
    .controller('SocialGroupController',
                ['BackendService', 'AppState', '$location', '$http', SocialGroupController]);

function SocialGroupController(BackendService, AppState, $location, $http) {
    var vm = this;
    if (!AppState.user) {
        $location.url('/');
        return vm;
    }

    vm.collectedByUuid = AppState.user.userId;
    vm.codes = AppState.groupTypeCodes;
    vm.create = validateCreate;
    vm.loadData = loadData;

    function loadData() {
        $http.get('/api/projectcode/socialGroupType')
            .then(
                function(response) {
                    vm.codes = response.data;
                },
                function(response) {
                    console.log("Unable to get social group types \n" + response);
                });
    }

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }

    function create() {
        vm.date = new Date().toISOString();
        var body = {
            groupName: vm.groupName,
            extId: vm.extId,
            groupType: vm.groupType,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid};
        $http.post("/api/socialgroup", body).then(
            function(response) {
                AppState.socialGroup = response.data;
                $location.url('/individual/new');
                console.log("yay! " + JSON.stringify(response));
            },
            function(response) {
                console.log("oops " + response.status);
            }
        );
    }
}
