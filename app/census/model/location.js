'use strict';

angular.module('openHDS.model').factory('LocationService', LocationService);

LocationService.$inject = ['BackendService', 'ModelService'];

function LocationService(BackendService, ModelService) {
    return {
        create: create
    };

    function create(location) {
        BackendService.post("/locations", location).then(
            function(response) {
                ModelService.currentLocation = response.data.uuid;
            }
        );
    }
}