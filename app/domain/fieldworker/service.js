'use strict';

angular.module('openhds')
    .service('FieldWorkerService',
             ['$rootScope', '$http', FieldWorkerService]);

function FieldWorkerService($rootScope, $http) {
    var service = this;
    var headers = {
        headers: {
            authorization: "Basic " + $rootScope.credentials
        }
    };

    function FieldWorker(json) {
        return {
            uuid: json.uuid,
            id: json.fieldWorkerId,
            firstName: json.firstName,
            lastName: json.lastName
        };
    }

    service.getAllFieldWorkers = function(callback) {
        var url = $rootScope.restApiUrl + "/fieldWorkers/bulk.json";
        $http.get(url, headers).then(function(response) {
            var fieldworkers = response.data.map(FieldWorker);
            callback(fieldworkers);
        });
    };

    return service;
}
