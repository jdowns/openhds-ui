'use strict';

angular.module('openHDS.core').factory('ModelService', ModelService);

function ModelService() {
    var vm = this;

    vm.currentFieldWorker = {};
    vm.currentLocation = {};
    vm.currentIndividual = {};

    return vm;
}