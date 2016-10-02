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

    function IndividualRequest(model, fieldworker, time) {
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

    service.submitIndividual = function(individual, fieldworker, time, callback) {
        var url = $rootScope.restApiUrl + "/individuals";
        var request = IndividualRequest(individual, fieldworker, time);
        $http.post(url, request, headers).then(function(response) {
            var individualResponse = response.data;
            callback(individualResponse);
        });
    };

    return service;
}
