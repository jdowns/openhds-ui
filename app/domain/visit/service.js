'use strict';

angular.module('openhds')
    .service('VisitService',
             ['EntityService', VisitService]);

function VisitService(EntityService) {
    var service = this;
    var urlBase = "/visits";

    function Request(model) {
        return {
            collectedByUuid: model.fieldWorker.uuid,
            locationUuid: model.location.uuid,
            visit: {
                extId: model.entity.extId,
                visitDate: model.collectionDate,
                collectionDateTime: model.collectionDate
            }
        };
    }


    function Response(entity) {
        return {
            uuid: entity.uuid,
            extId: entity.extId,
            collectionDateTime : entity.collectionDateTime
        };
    }



    service.getByExtId = function(extId) {
        return EntityService.getByExtId(urlBase, Response, extId);
    };

    service.getByHierarchy = function(hierarchyUuid) {
        return EntityService.getByHierarchy(urlBase, Response, hierarchyUuid);
    };

    service.getByFieldWorker = function(id) {
        return EntityService.getByFieldWorker(urlBase, Response, id);
    };

    service.getBySearch = function(entityList) {
        return EntityService.getBySearch(urlBase, Response, entityList);

    };

    service.submit = function(fieldWorker, collectionDate, location, event) {
        var model = {
            fieldWorker: fieldWorker,
            collectionDate: collectionDate,
            location: location,
            entity: event
        };
        return EntityService.submit(urlBase, Request, model);
    };

    return service;
}
