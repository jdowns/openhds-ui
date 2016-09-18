angular.module('openHDS.view')
    .controller('SocialGroupController',
                ['AppState', '$location', '$http', SocialGroupController]);

function SocialGroupController(AppState, $location, $http) {
    var vm = this;
    AppState.validateUser();

    vm.collectedByUuid = AppState.user.userId;
    vm.codes = AppState.groupTypeCodes;
    vm.date = new Date().toISOString();

    function handleCodes(response) {
        vm.codes = response.data;
    }

    function handleSocialGroupResponse(response) {
        AppState.socialGroup = response.data;
        $location.url('/individual/new');
    }

    vm.loadData = function() {
        $http.get('/api/projectcode/socialGroupType').then(handleCodes);
    };

    vm.create = function() {
        var body = {
            groupName: vm.groupName,
            extId: vm.extId,
            groupType: vm.groupType,
            collectionDateTime: vm.date,
            collectedByUuid: vm.collectedByUuid};
        $http.post("/api/socialgroup", body).then(handleSocialGroupResponse);
    };
}
