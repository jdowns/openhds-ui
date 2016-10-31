'use strict';

angular.module('openhds')
    .service('OutMigrationService',
             ['EntityService', OutMigrationService]);

function OutMigrationService(EntityService) {
    var service = this;
    var urlBase = "/outMigrations";

    function Request(model) {
        if (model.residency === null)  {
            model.residency = {uuid: "UNKNOWN"};
        }
        return {
            collectedByUuid: model.fieldWorker.uuid,
            visitUuid: model.visit.uuid,
            individualUuid: model.individual.uuid,
            residencyUuid: model.residency.uuid,
            outMigration: {
                migrationDate: model.event.migrationDate,
                destination: model.event.destination,
                reason: model.event.reason,
                collectionDateTime: model.collectionDate
            }
        };
    }

    service.submit = function(fieldWorker, collectionDate, visit,
                              individual, residency, event) {
        var model = {
            fieldWorker: fieldWorker,
            collectionDate: collectionDate,
            visit: visit,
            individual: individual,
            residency: residency,
            event: event
        };
        return EntityService.submit(urlBase, Request, model);
    };

    return service;
}
