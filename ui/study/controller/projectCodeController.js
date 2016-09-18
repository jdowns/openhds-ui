angular.module('openHDS.view')
    .controller('ProjectCodeController',
        ['$http', ProjectCodeController]);

function ProjectCodeController($http) {
    var vm = this;
    vm.create = validateCreate;

    function validateCreate(formValid) {
        if (formValid) {
            create();
        }
    }
    function create() {
        var body = {
            projectCode:
            {
                codeName: vm.codeName,
                codeGroup: vm.codeGroup,
                codeValue: vm.codeValue,
                description: vm.description
            }
        };
        $http.post("/projectCode", body).then(
            function(response) {
                console.log("yay! projectCode " + JSON.stringify(response));
            },
            function(response) {
                console.log("oops " + response.status);
            }
        );
    }
}
