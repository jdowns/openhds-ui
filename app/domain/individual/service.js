'use strict';

angular.module('openhds')
    .service('IndividualService',
             ['EntityService', IndividualService]);

function IndividualService(EntityService) {
    var service = this;
    var urlBase = '/individuals';

    function Request(model) {
        return {
            collectedByUuid: model.fieldWorker.uuid,
            individual: {
                firstName: model.entity.firstName,
                lastName: model.entity.lastName,
                dateOfBirth: model.entity.dateOfBirth,
                extId: model.entity.extId,
                gender: model.entity.gender,
                collectionDateTime: model.collectionDate
            }
        };
    }

    function Response(entity) {
        return {
            uuid: entity.uuid,
            extId: entity.extId,
            firstName: entity.firstName,
            lastName: entity.lastName,
            dateOfBirth: entity.dateOfBirth,
            gender: entity.gender
        };
    }


    service.getByHierarchy = function(hierarchyUuid) {
        return EntityService.getByHierarchy(urlBase, Response, hierarchyUuid);
    };

    service.getByUuid = function(uuid) {
        return EntityService.getByUuid(urlBase, Response, uuid);
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
