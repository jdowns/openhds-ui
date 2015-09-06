'use strict';

angular.module('openHDS.model').factory('FieldWorkerService', FieldWorkerService);

FieldWorkerService.$inject = ['BackendService', 'ModelService'];

function FieldWorkerService(BackendService, ModelService) {
    var loggedIn = false;

    return {
        authorize: authorize,
        authorized: authorized
    };

    function authorized() {
        return loggedIn;
    }

    function authorize(username, password, callback) {
        var result;
        BackendService.get("/fieldWorker/bulk")
            .then(
                function(response) {
                    console.log("looged in successfully")
                    loggedIn = true;
                },
                function(error) {
                    console.log("Something went wrong logging in");
                    loggedIn = false;
                }
            );
    }
}