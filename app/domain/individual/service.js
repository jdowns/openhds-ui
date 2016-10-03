'use strict';

angular.module('openhds')
    .service('IndividualService',
             ['$rootScope', '$http', IndividualService]);

function IndividualService($rootScope, $http) {
    var service = this;
    var headers = {
        headers: {
            authorization: "Basic " + $rootScope.credentials
        }
    };

    function Request(model) {
        return {
            collectedByUuid: model.currentFieldworker,
            locationHierarchyUuid: model.currentHierarchy.uuid,
            location: {
                name: model.location.name,
                extId: model.location.extId,
                type: model.location.type,
                collectionDateTime: model.collectionDateTime
            }
        };
    }

    service.submitOne = function(model) {
        var url = $rootScope.restApiUrl + "/individuals";
        var request = Request(model);
        $http.post(url, request, headers);
    };

    service.submit = function(model, callback) {
        Promise.all(model.socialGroups.map(service.submitOne))
            .then(function(response) {
                callback(response);
            });
    };

    return service;
}
