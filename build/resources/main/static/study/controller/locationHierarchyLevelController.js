angular.module('openHDS.view')
    .controller('LocationHierarchyLevelController',
        ['BackendService', LocationHierarchyLevelController]);

function LocationHierarchyLevelController(BackendService) {
    var vm = this;
    vm.create = validateCreate;

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }
    function create() {
        var body = {
            locationHierarchyLevel:
            {
                name: vm.name
            }
        };
        BackendService.post("/locationHierarchyLevel", body).then(
            function(response) {
                console.log("yay! LocationHierarchyLevelController " + JSON.stringify(response));
            },
            function(response) {
                console.log("oops " + response.status);
            }
        );
    }
}