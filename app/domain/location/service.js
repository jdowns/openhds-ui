'use strict';

angular.module('openhds')
    .service('LocationService',
             ['EntityService', LocationService]);

function LocationService(EntityService) {
    var service = this;
    var urlBase = '/locations';

    function Request(model) {
        return {
            collectedByUuid: model.fieldWorker.uuid,
            locationHierarchyUuid: model.currentHierarchy.uuid,
            location: {
                name: model.entity.name,
                extId: model.entity.extId,
                type: model.entity.type,
                collectionDateTime: model.collectionDate
            }
        };
    }

    function Response(data) {
        return {
            uuid: data.uuid,
            name: data.name,
            extId: data.extId,
            type: data.type,
            description: data.description
        };
    }

    service.getByHierarchy = function(uuid) {
        return EntityService.getByHierarchy(urlBase, Response, uuid);
    };

    service.getByUuid = function(uuid) {
        return EntityService.getByUuid(urlBase, Response, uuid);
    };

    service.submit = function(fieldWorker, collectionDate, hierarchy, entity) {
        var model = {
            fieldWorker: fieldWorker,
            collectionDate: collectionDate,
            currentHierarchy: hierarchy,
            entity: entity
        };
        return EntityService.submit(urlBase, Request, model);
    };

    return service;
};
