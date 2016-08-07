'use strict';

angular.module('openHDS.core').factory('BackendService', BackendService);

BackendService.$inject = ['$http'];

function BackendService($http) {
    var vm = this;
    vm.get = get;
    vm.post = post;

    return vm;

    function get(url) {
        return $http.get(url);
    }

    function post(url, data) {
        console.log("posting" + data);
        return $http({url: url,
                      method: 'POST',
                      data: data});
    }
}