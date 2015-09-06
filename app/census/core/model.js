'use strict';

angular.module('openHDS').factory('ModelService', ModelService);

function ModelService() {
    var vm = this;

    vm.currentFieldWorker = {};
    vm.currentLocation = {};
    vm.currentIndividual = {};

    return vm;
}