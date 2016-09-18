'use strict';

angular.module('openHDS.core')
    .factory('LocationService', FieldWorkerService);

FieldWorkerService.$inject = ['$rootScope', '$http'];

function FieldWorkerService($rootScope, $http) {

    const fieldworkers = {}; // fieldWorkerId => uuid
    const fieldWorkerUrl = $rootScope.restApiUrl + "/fieldworkers.bulk";

    function addFieldWorker(fieldworker) {
        if (fieldworker &&
            fieldworker.fieldWorkerId &&
            fieldworker.uuid)
        {
            fieldworkers[fieldworker.fieldWorkerId] = fieldworker.uuid;
        }
    }

    function handleFieldWorkerResponse(response) {
        response.data.forEach(addFieldWorker);
    }

    return {
        lookup: fieldWorkerId => fieldworkers[fieldWorkerId],
        init: () => $http.get(fieldWorkerUrl)
                         .then(handleFieldWorkerResponse)
    }
}