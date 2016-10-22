'use strict';

angular.module('openhds')
    .service('PregnancyResultService',
             ['EntityService', PregnancyResultService]);

function PregnancyResultService(EntityService) {
    var service = this;
    var urlBase = "/pregnancyResults";

    function Request(model) {
        return {
            collectedByUuid: model.fieldWorker.uuid,
            visitUuid: model.visit.uuid,
            pregnancyOutcomeUuid: model.pregnancyOutcome.uuid,
            childUuid: model.child.uuid,
            pregnancyResult: {
                type: model.event.type,
                collectionDateTime: model.collectionDate
            }
        };
    }

    service.submit = function(fieldWorker, collectionDate, visit,
                              outcome, child, event) {
        var model = {
            fieldWorker: fieldWorker,
            collectionDate: collectionDate,
            visit: visit,
            pregnancyOutcome: outcome,
            child: child,
            event: event
        };
        return EntityService.submit(urlBase, Request, model);
    };

    return service;
}
