'use strict';

angular.module('openhds')
    .service('VisitService',
             ['EntityService', VisitService]);

function VisitService(EntityService) {
    var service = this;
    var urlBase = "/visits";

    function visitUuid(model) {
        var extId = model.location.extId +
                "-" +
                model.fieldWorker.id +
                "-" +
                model.collectionDate
        ;
        console.log(model.fieldWorker);
        return extId;
    }

    function Request(model) {
        return {
            collectedByUuid: model.fieldWorker.uuid,
            locationUuid: model.location.uuid,
            visit: {
                extId: visitUuid(model),
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

    service.submit = function(fieldWorker, collectionDate, location, event) {
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
                if (response.data.length > 0) {
                    console.log('unable to delete entity!');
                    failure(response.data);
                } else {
                    console.log('delete succeeded!');
                    success(response.data);
                }
            });
    };

    return service;
}
