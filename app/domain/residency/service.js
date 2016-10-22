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


    service.submit = function(startType, fieldWorker,individual,location, collectionDate, entity) {
        var model = {
            startType : startType,
            individual : individual,
            location : location,
            fieldWorker: fieldWorker,
            collectionDate: collectionDate,
            entity: entity
        };
        return EntityService.submit(urlBase, Request, model);
    };

    return service;
}
