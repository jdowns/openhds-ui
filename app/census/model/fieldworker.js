'use strict';

angular.module('openHDS.model').factory('FieldWorkerService', FieldWorkerService);

FieldWorkerService.$inject = ['BackendService', 'ModelService'];

function hash(val) {
    return val;
}

function FieldWorkerService(BackendService, ModelService) {
    var loggedIn = false;

    return {
        authorize: authorize,
        authorized: authorized,
        currentFieldWorker: getCurrentFieldWorker
    };

    function authorized() {
        return loggedIn;
    }

    function getCurrentFieldWorker() {
        return ModelService.currentFieldWorker;
    }

    function authorize(username, password) {
        var result;
        function validate(fieldWorker) {
            if(fieldWorker.fieldWorkerId == username && fieldWorker.passwordHash == hash(password)) {
                loggedIn = true;
                ModelService.currentFieldWorker = fieldWorker.uuid;
            }
        }

        BackendService.get("/fieldWorkers/bulk.json")
            .then(
                function(response) {
                    var fws = response.data;

                    fws.forEach(validate);

                },
                function(error) {
                    loggedIn = false;
                }
            );
    }
}