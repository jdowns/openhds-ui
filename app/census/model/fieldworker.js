'use strict';

angular.module('openHDS.model').factory('FieldWorkerService', FieldWorkerService);

FieldWorkerService.$inject = ['BackendService', 'ModelService'];

function FieldWorkerService(BackendService, ModelService) {
    return {
        authorize: authorize,
    };

    function authorize(username, password) {
        return true;
    }
}