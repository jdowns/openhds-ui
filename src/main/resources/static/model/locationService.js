'use strict';

angular.module('openHDS.core').factory('LocationService', LocationService);

LocationService.$inject = ['BackendService', 'AppState'];

function LocationService(BackendService, AppState) {
    var vm = this;
    vm.create = create;

    return vm;

    function create(location) {
        BackendService.post("/location", location).then(
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