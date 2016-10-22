'use strict';

angular.module('openhds')
    .service('InMigrationService',
             ['EntityService', InMigrationService]);

function InMigrationService(EntityService) {
    var service = this;
    var urlBase = "/inMigrations";

    function Request(model) {
        return {
            collectedByUuid: model.fieldWorker.uuid,
            visitUuid: model.visit.uuid,
            individualUuid: model.individual.uuid,
            residencyUuid: model.residency.uuid,
            inMigration: {
                migrationDate: model.event.migrationDate,
                migrationType: model.event.migrationType,
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
