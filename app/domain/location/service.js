'use strict';

angular.module('openhds')
    .service('LocationService',
             ['$rootScope', '$http', LocationService]);

function LocationService($rootScope, $http) {
    var service = this;
    var headers = {
        headers: {
            authorization: "Basic " + $rootScope.credentials
        }
    };

    function LocationRequest(model, fieldworker, time) {
        return {
            collectedByUuid: fieldworker,
            locationHierarchyUuid: model.currentHierarchy.uuid,
            location: {
                name: model.location.name,
                extId: model.location.extId,
                type: model.location.type,
                collectionDateTime: time
            }
        };
    }

    service.submitLocation = function(location, fieldworker, time, callback) {
        var url = $rootScope.restApiUrl + "/locations";
        var request = LocationRequest(location, fieldworker, time);
        $http.post(url, request, headers).then(function(response) {
            var locationResponse = response.data;
            callback(locationResponse);
        });
    };

    return service;
}
