'use strict';

angular.module('openHDS.core').factory('ModelService', ModelService);

function ModelService() {

    return {
        currentFieldWorker: {},
        currentLocation: {},
        currentIndividual: {}
    };
}