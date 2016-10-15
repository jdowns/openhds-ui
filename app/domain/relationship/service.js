'use strict';

angular.module('openhds')
    .service('RelationshipService',
             ['EntityService', RelationshipService]);

function RelationshipService(EntityService) {
    var service = this;
    var urlBase = '/relationships';

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

    return service;
}
