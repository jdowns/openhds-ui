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
                    var entities = response.data.map(responseClass);
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
                    console.log(response);
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
      //  console.log("url: " + url);
     //   console.log("model: " + JSON.stringify(model));
        var request = model;
     //   console.log("req: " + JSON.stringify(request));   //req: {"name":"location-2zxZx","type":"RURAL","description":"sample locationxZxZ","status":"xZXz"}
        return $http.put(url, request, service.getHeaders())
            .then(function(response){
                console.log(response.status);
            })
    };

    service.safeDelete = function(urlBase, id, reason) {
        var url = $rootScope.restApiUrl + urlBase + "/safeDelete/" + id;
        var config = service.getHeaders();
        config.data = reason;
        return $http.delete(url, config);
    };

    return service;
}
