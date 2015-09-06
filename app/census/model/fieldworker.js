'use strict';

angular.module('openHDS.model').factory('FieldWorkerService', FieldWorkerService);

FieldWorkerService.$inject = ['BackendService', 'ModelService'];

function hash(val) {
    return val;
}

function FieldWorkerService(BackendService, ModelService) {
    var loggedIn = false;
    var currentFieldWorker;

    return {
        authorize: authorize,
        authorized: authorized,
        currentFieldWorker: getCurrentFieldWorker
    };

    function authorized() {
        return loggedIn;
    }

    function getCurrentFieldWorker() {
        return currentFieldWorker;
    }

    function authorize(username, password, callback) {
        var result;
        BackendService.get("/fieldWorker/bulk")
            .then(
                function(response) {
                    if(response.data.fieldWorkerId == username &&
                            response.data.passwordHash == hash(password)) {
                        loggedIn = true;
                        currentFieldWorker = response.data.uuid;
                    } else {
                        console.log(response.data)
                    }

                },
                function(error) {
                    loggedIn = false;
                }
            );
    }
}