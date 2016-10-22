'use strict';

angular.module('openhds')
    .service('PregnancyOutcomeService',
             ['EntityService', PregnancyOutcomeService]);

function PregnancyOutcomeService(EntityService) {
    var service = this;
    var urlBase = "/pregnancyOutcomes";

    function Request(model) {
        return {
            collectedByUuid: model.fieldWorker.uuid,
            visitUuid: model.visit.uuid,
            fatherUuid: model.father.uuid,
            motherUuid: model.mother.uuid,
            pregnancyOutcome: {
                outcomeDate: model.event.outcomeDate,
                collectionDateTime: model.collectionDate
            }
        };
    }

    service.submit = function(fieldWorker, collectionDate, visit,
                              mother, father, event) {
        var model = {
            fieldWorker: fieldWorker,
            collectionDate: collectionDate,
            visit: visit,
            mother: mother,
            father: father,
            event: event
        };
        return EntityService.submit(urlBase, Request, model);
    };

    return service;
}
