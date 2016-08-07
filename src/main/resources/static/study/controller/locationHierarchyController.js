angular.module('openHDS.view')
    .controller('LocationHierarchyController',
        ['BackendService', LocationHierarchyController]);

function LocationHierarchyController(BackendService) {
    var vm = this;
    vm.create = validateCreate;

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }
    function create() {
        var body = {
            locationHierarchy:
            {
                name: vm.name,
                extId: vm.extId,
                collectionDateTime: new Date().toISOString()
            },
            collectedByUuid: vm.collectedByUuid
        };
        BackendService.post("/locationHierarchy", body).then(
            function(response) {
                console.log("yay! LocationHierarchyController " + JSON.stringify(response));
            },
            function(response) {
                console.log("oops " + response.status);
            }
        );
    }
}