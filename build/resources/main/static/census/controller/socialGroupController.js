angular.module('openHDS.view')
    .controller('SocialGroupController',
        ['BackendService', 'AppState', '$location', SocialGroupController]);

function SocialGroupController(BackendService, AppState, $location) {
    var vm = this;
    if (!AppState.user) {
        $location.url('/');
        return vm;
    }
    
    vm.collectedByUuid = AppState.user.userId;
    vm.create = validateCreate;

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }
    function create() {
        var body = {
            socialGroup:
            {
                groupName: vm.groupName,
                extId: vm.extId,
                groupType: vm.groupType,
                collectionDateTime: new Date().toISOString()},
            collectedByUuid: vm.collectedByUuid};
        BackendService.post("/socialGroup", body).then(
            function(response) {
                console.log("yay! " + JSON.stringify(response));
            },
            function(response) {
                console.log("oops " + response.status);
            }
        );
    }
}