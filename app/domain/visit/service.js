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
