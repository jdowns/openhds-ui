'use strict';

angular.module('openHDS.model').factory('FieldWorkerService', FieldWorkerService);

FieldWorkerService.$inject = ['BackendService', 'ModelService'];

function FieldWorkerService(BackendService, ModelService) {
    return {foo: 1,
        b: BackendService.someVariable,
        c: ModelService.someVariable
    };
}