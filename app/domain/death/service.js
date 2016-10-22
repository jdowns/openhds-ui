'use strict';

angular.module('openhds')
    .service('DeathService',
             ['EntityService', DeathService]);

function DeathService(EntityService) {
    var service = this;
    var urlBase = "/deaths";

    function Request(model) {
        return {
            collectedByUuid: model.fieldWorker.uuid,
            visitUuid: model.visit.uuid,
            individualUuid: model.individual.uuid,
            death: {
                deathDate: model.event.deathDate,
                collectionDateTime: model.collectionDate
            }
        };
    }

    service.submit = function(fieldWorker, collectionDate, visit,
                              individual, event) {
        var model = {
            fieldWorker: fieldWorker,
            collectionDate: collectionDate,
            visit: visit,
            individual: individual,
            event: event
        };
        return EntityService.submit(urlBase, Request, model);
    };

    return service;
}
