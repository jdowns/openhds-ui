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
    vm.codes = AppState.groupTypeCodes;
    vm.create = validateCreate;
    
    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }
    function create() {
        vm.date = new Date().toISOString();
        var body = {
            socialGroup:
            {
                groupName: vm.groupName,
                extId: vm.extId,
                groupType: vm.groupType,
                collectionDateTime: vm.date},
            collectedByUuid: vm.collectedByUuid};
        BackendService.post("/socialGroup", body).then(
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