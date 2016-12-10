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
        var url = $rootScope.restApiUrl + urlBase + '/bulk.json?locationHierarchyUuid=' + uuid;

        var responsePromise = $http.get(url, service.getHeaders());

        return $q(function(resolve, reject) {
            responsePromise.then(
                function(response) {
                    var entities = response.data.map(responseClass);
                    resolve(entities);
                }).catch(function(response) {
                        console.log(response);
                });
        });
    };

    service.getByFieldWorker = function(urlBase, responseClass, id) {
        var url = $rootScope.restApiUrl + urlBase + '.json?fieldWorkerId=' + id;

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



    service.getByExtId = function(urlBase, responseClass, extId) {
        var url = $rootScope.restApiUrl + urlBase + '/external/' + extId;
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

    service.getByLocation = function(urlBase, responseClass, locationId) {
        var url = $rootScope.restApiUrl + urlBase + '/findByLocation/?locationUuid=' + locationId;

        var responsePromise = $http.get(url, service.getHeaders());


        return $q(function(resolve, reject) {
            responsePromise.then(
                function(response) {
                    var entities = response.data;
                    resolve(entities);
                }
            );
        });
    };

    service.getBySocialGroup = function(urlBase, responseClass, socialGroupId) {
        var url = $rootScope.restApiUrl + urlBase + '/findBySocialGroup/?socialGroupUuid=' + socialGroupId;
        var responsePromise = $http.get(url, service.getHeaders());

        return $q(function(resolve, reject) {
            responsePromise.then(
                function(response) {
                    var entities = response.data;
                    resolve(entities);
                }
            );
        });
    };


    service.getBySearch = function(urlBase, responseClass, entityList) {
        var url = $rootScope.restApiUrl + urlBase + '/search?' + entityList;
        var responsePromise = $http.get(url, service.getHeaders());
        return $q(function(resolve, reject) {
            responsePromise.then(function(response) {
                var entities = response.data;
                resolve(entities);
            });
        });
    };


    service.getByVisitDate = function(urlBase, responseClass, visitDate) {

        var visJson = visitDate.toJSON();
        var url = $rootScope.restApiUrl + urlBase + '/findByVisitDate?visitDate=' + visJson;
        var responsePromise = $http.get(url, service.getHeaders());

        return $q(function(resolve, reject) {
            responsePromise.then(
                function(response) {
                    var entities = response.data;
                    resolve(entities);
                }
            );
        });
    };

    service.getByAfterDate = function(urlBase, responseClass, visitDate) {

        var url = $rootScope.restApiUrl + urlBase + '/bydate/bulk.json?after=' + visitDate;
        var responsePromise = $http.get(url, service.getHeaders());

        return $q(function(resolve, reject) {
            responsePromise.then(
                function(response) {
                    var entities = response.data;
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

    service.submitEdited = function (urlBase, model) {
        var url = $rootScope.restApiUrl + urlBase + "/submitEdited/" + model.uuid;
        var request = model;
        return $http.put(url, request, service.getHeaders())
            .then(function(response){
                console.log(response.status);
            });
    };

    service.safeDelete = function(urlBase, id, reason) {
        var url = $rootScope.restApiUrl + urlBase + "/safeDelete/" + id;
        var config = service.getHeaders();
        config.data = reason;
        return $http.delete(url, config);
    };

    service.delete = function(urlBase, id, reason) {
        var url = $rootScope.restApiUrl + urlBase + "/" + id;
        var config = service.getHeaders();
        config.data = reason;
        return $http.delete(url, config);
    };

    service.getExtId = function(urlBase, type, data) {
        var config = service.getHeaders();
        data.type = type;
        return $http.post($rootScope.restApiUrl + urlBase + "/generateExtId", data, config);
    };

    service.validateExtId = function(urlBase, type, id, data) {
        var config = service.getHeaders();
        data.type = type;
        return $http.post($rootScope.restApiUrl + urlBase + "/validateExtId/" + id, data, config);
    };

    return service;
}
