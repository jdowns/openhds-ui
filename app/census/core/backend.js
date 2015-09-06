'use strict';

angular.module('openHDS.core').factory('BackendService', BackendService);

BackendService.$inject = ['$http'];

function BackendService($http) {
    var vm = this;
    vm.hostname = 'http://www.example.com';
    vm.get = get;

    return vm;

    function get(url) {
        return $http.get(vm.hostname + url);
    }
}