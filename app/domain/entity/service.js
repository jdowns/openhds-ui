'use strict';

angular.module('ServiceModule', [])
    .service('EntityService', ['$rootScope', '$http', '$q', EntityService]);


function EntityService($rootScope, $http, $q) {
    var service = this;

    service.getHeaders = function() {
        return {
            headers: {
                authorization: "Basic " + $rootScope.credentials
            }
        };
    };

    service.getByHierarchy = function(urlBase, responseClass, uuid) {
        var url = $rootScope.restApiUrl + urlBase + '.json?locationHierarchyUuid=' + uuid;

        var responsePromise = $http.get(url, service.getHeaders());

        return $q(function(resolve, reject) {
            responsePromise.then(
                function(response) {
                    var entities = response.data.content.map(responseClass);
                    resolve(entities);
                }
            );
        });
    };

    service.getBulk = function(urlBase, responseClass) {
        var url = $rootScope.restApiUrl + urlBase + '/bulk.json';
        var responsePromise = $http.get(url, service.getHeaders());
        return $q(function(resolve, reject) {
            responsePromise.then(function(response) {
                var entities = response.data.map(responseClass);
                resolve(entities);
            });
        });
    };

    service.submit = function (urlBase, requestClass, model) {
        var url = $rootScope.restApiUrl + urlBase;
        var request = requestClass(model);
        return $http.post(url, request, service.getHeaders());
    };

    return service;
}
