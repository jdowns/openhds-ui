'use strict';

angular.module('openhds')
    .service('ResidencyService',
             ['EntityService', ResidencyService]);

function ResidencyService(EntityService) {
    var service = this;
    var urlBase = '/residencies';

    function Request(model) {
        return {
            collectedByUuid: model.fieldWorker.uuid,
            residency: {
                individual: model.entity.individual,
                location: model.entity.location,
                startType: model.entity.startType,
                startDate: model.entity.startDate,
                collectionDateTime: model.collectionDate
            }
        };
    }

    service.submitOne = function(fieldWorker, collectionDate, entity) {
        var model = {
            fieldWorker: fieldWorker,
            collectionDate: collectionDate,
            entity: entity
        };
        return EntityService.submit(urlBase, Request, model);
    };

    service.submit = function(fieldWorker, collectionDate, models) {
        function submitModel() {
            return function(model) {
                return service.submitOne(fieldWorker, collectionDate, model);
            };
        }
        var result = models.map(submitModel());
        return Promise.all(result);
    };

    return service;
}
