'use strict';

angular.module('openhds')
    .service('RelationshipService',
             ['$rootScope','$http','$q','EntityService', RelationshipService ]);

function RelationshipService($rootScope, $http, $q, EntityService) {
    var service = this;
    var urlBase = '/relationships';

    service.getHeaders = function() {
        return {
            headers: {
                authorization: "Basic " + $rootScope.credentials
            }
        };
    };

    function Request(model) {
        return {
            collectedByUuid: model.fieldWorker.uuid,
            individualAUuid: model.entity.individualA,
            individualBUuid: model.entity.individualB,
            relationship: {
                relationshipType: model.entity.relationshipType,
                startDate: model.entity.startDate,
                collectionDateTime: model.collectionDate
            }
        };
    }

    service.getRelationshipsByIndividual = function(individualUuid) {

        var uuid = individualUuid;

        var url = $rootScope.restApiUrl + '/individuals/getRelationships?individualUuid=' + uuid;

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

    service.submitOne = function(fieldWorker, collectionDate, entity) {
        var model = {
            fieldWorker: fieldWorker,
            collectionDate: collectionDate,
            entity: entity
        };
        return EntityService.submit(urlBase, Request, model);
    };

    service.submit = function(fieldWorker, collectionDate, models) {
        function submitModel() {
            return function(model) {
                return service.submitOne(fieldWorker, collectionDate, model);
            };
        }
        var result = models.map(submitModel());
        return Promise.all(result);
    };

    service.delete = function(id) {
        var url = $rootScope.restApiUrl + "/relationships/" + id;

        return $http.delete(url, service.getHeaders());
    };

    return service;
}
