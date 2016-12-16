'use strict';

angular.module('openhds')
    .service('PregnancyOutcomeService',
             ['EntityService', PregnancyOutcomeService]);

function PregnancyOutcomeService(EntityService) {
    var service = this;
    var urlBase = "/pregnancyOutcomes";

    function Request(model) {
        var father;
        if (model.father == null){
            father = null;
        }
        else{
            father = model.father.uuid;
        }

        return {
            collectedByUuid: model.fieldWorker.uuid,
            visitUuid: model.visit.uuid,
            fatherUuid: father,
            motherUuid: model.mother.uuid,
            pregnancyOutcome: {
                outcomeDate: model.event.outcomeDate,
                collectionDateTime: model.visit.visitDate
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
