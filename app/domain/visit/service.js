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
            location: entity.location,
            visitDate: entity.visitDate,
            collectionDateTime : entity.collectionDateTime
        };
    }

    service.getByLocation = function(locationId) {
        return EntityService.getByLocation(urlBase, Response, locationId);
    };

    service.getVisitByExtId = function(extId) {
        return EntityService.getByExtId(urlBase, Response, extId);
    };

    service.getByHierarchy = function(hierarchyUuid) {
        return EntityService.getByHierarchy(urlBase, Response, hierarchyUuid);
    };

    service.getByFieldWorker = function(id) {
        return EntityService.getByFieldWorker(urlBase, Response, id);
    };

    service.getByVisitDate = function(visitDate) {
        return EntityService.getByVisitDate(urlBase, Response, visitDate);
    };

    service.getByAfterDate = function(visitDate) {
        return EntityService.getByAfterDate(urlBase, Response, visitDate);
    };

    service.submit = function(fieldWorker, collectionDate, location, event, extId) {
        event.extId = extId;
        var model = {
            fieldWorker: fieldWorker,
            collectionDate: collectionDate,
            location: location,
            entity: event
        };
        return EntityService.submit(urlBase, Request, model);
    };

    service.delete = function(id, reason, success, failure) {
        EntityService.safeDelete(urlBase, id, reason)
            .then(function(response) {
                console.log(response);
            });
    };

    service.getExtId = function() {
        var data = {};
        return EntityService.getExtId(urlBase, 'Visit', data);
    };

    return service;
}
