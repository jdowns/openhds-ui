'use strict';

angular.module('openhds')
    .service('ResidencyService',
        ['$rootScope','$http','$q','EntityService', ResidencyService]);

function ResidencyService($rootScope, $http, $q, EntityService) {
    var service = this;
    var urlBase = '/residencies';

    service.getHeaders = function() {
        return {
            headers: {
                authorization: "Basic " + $rootScope.credentials
            }
        };
    };
    service.getResidenciesByIndividual = function(individualUuid) {

        var uuid = individualUuid;
        var url = $rootScope.restApiUrl + '/individuals/getResidencies?individualUuid=' + uuid;
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

    function Request(model) {
        console.log(model)
        return {
            collectedByUuid: model.fieldWorker.uuid,
            individualUuid: model.individual.uuid,
            locationUuid: model.location.uuid,
            residency: {
                startType: model.startType,
                startDate: model.entity.startDate,
                collectionDateTime: model.collectionDate
            }
        };
    }

    function Response(entity) {
        return {
            uuid: entity.uuid,
            extId: entity.extId,
            startType: entity.startType,
            startDate: entity.startDate,
            individual: entity.individual,
            location: entity.location
        };
    }


    service.getByHierarchy = function(hierarchyUuid) {
        return EntityService.getByHierarchy(urlBase, Response, hierarchyUuid);
    };

    service.delete = function(id) {
        var url = $rootScope.restApiUrl + "/residencies/" + id;

        return $http.delete(url, service.getHeaders());
    };

    service.submit = function(startType, fieldWorker, individual, location, collectionDate, entity) {
        var model = {
            startType : startType,
            individual : individual,
            location : location,
            fieldWorker: fieldWorker,
            collectionDate: collectionDate,
            entity: entity
        };
        console.log('submitting residency for')
        console.log(model)
        return EntityService.submit(urlBase, Request, model);
    };

    return service;
}
