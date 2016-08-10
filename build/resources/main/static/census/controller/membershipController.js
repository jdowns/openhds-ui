angular.module('openHDS.view')
    .controller('MembershipController',
        ['BackendService', 'AppState', '$location', MembershipController]);

function MembershipController(BackendService, AppState, $location) {
    var vm = this;
    if (!AppState.user) {
        $location.url('/');
        return vm;
    }
    BackendService.get("/projectCode/membershipType")
        .then(
            function(response) {
                console.log(JSON.stringify(response));
                vm.codes = response.data;
            },
            function(response) {
                console.log("Unable to fetch project codes! " + JSON.stringify(response));
            }
        );
    vm.collectedByUuid = AppState.user.userId;
    vm.create = validateCreate;

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }
    function create() {
        var body = {
            membership:
            {
                individual: vm.individual,
                socialGroup: vm.socialGroup,
                startType: vm.startType,
                startDate: vm.startDate,
                collectionDateTime: new Date().toISOString()},
            collectedByUuid: vm.collectedByUuid};
        BackendService.post("/membership", body).then(
            function(response) {
                console.log("yay! membership " + JSON.stringify(response));
            },
            function(response) {
                console.log("oops " + response.status);
            }
        );
    }
}