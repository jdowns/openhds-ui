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

    function Request(model) {
        return {
            collectedByUuid: model.currentFieldworker.uuid,
            locationHierarchyUuid: model.currentHierarchy.uuid,
            location: {
                name: model.location.name,
                extId: model.location.extId,
                type: model.location.type,
                collectionDateTime: model.collectionDateTime
            }
        };
    }

    service.submit = function(model, callback) {
        var url = $rootScope.restApiUrl + "/locations";
        var request = Request(model);
        $http.post(url, request, headers).then(function(response) {
            callback(response.data);
        });
    };

    return service;
}
