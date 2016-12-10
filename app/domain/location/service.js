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

/* not used yet...

    function EditRequest(model) {
        return {
            name: model.name,
            type: model.type,
            description: model.description,
            status: model.entityStatus
        };
    }
*/

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
        console.log(uuid)
        return EntityService.getByHierarchy(urlBase, Response, uuid);
    };

    service.getByExtId = function(extId) {
        return EntityService.getByExtId(urlBase, Response, extId);
    };

    service.getByFieldWorker = function(id) {
        return EntityService.getByFieldWorker(urlBase, Response, id);
    };


    service.getBySearch = function(entityList) {
        return EntityService.getBySearch(urlBase, Response, entityList);

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

    service.delete = function(id, reason) {
        EntityService.delete(urlBase, id, reason);
    };

    service.submitEdited = function(location) {
        return EntityService.submitEdited(urlBase, location);
    };

    service.getExtId = function() {
        var data = {};
        return EntityService.getExtId(urlBase, 'Location', data);
    };

    service.validateExtId = function(id) {
        var data = {};
        return EntityService.validateExtId(urlBase, 'Location', id, data);
    };

    return service;
};
