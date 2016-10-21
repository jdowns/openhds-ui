'use strict';

angular.module('openhds')
    .service('ResidencyService',
             ['EntityService', ResidencyService]);

function ResidencyService(EntityService) {
    var service = this;
    var urlBase = '/residencies';

    function Request(model) {
        return {
            collectedByUuid: model.fieldWorker.uuid,
            individualUuid: model.entity.individual.uuid,
            locationUuid: model.entity.location.uuid,
            residency: {
                startType: model.entity.startType,
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
            startDate: entity.startDate
        };
    }


    service.getByHierarchy = function(hierarchyUuid) {
        return EntityService.getByHierarchy(urlBase, Response, hierarchyUuid);
    };


    service.submit = function(fieldWorker, collectionDate, entity) {
        var model = {
            fieldWorker: fieldWorker,
            collectionDate: collectionDate,
            entity: entity
        };
        return EntityService.submit(urlBase, Request, model);
    };

    return service;
}
