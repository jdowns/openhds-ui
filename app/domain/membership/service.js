'use strict';

angular.module('openhds')
    .service('MembershipService',
             ['EntityService', MembershipService]);

function MembershipService(EntityService) {
    var service = this;
    var urlBase = '/memberships';

    function Request(model) {
        return {
            collectedByUuid: model.fieldWorker.uuid,
            membership: {
                individual: model.entity.individual,
                socialGroup: model.entity.socialGroup,
                startType: model.entity.startType,
                startDate: model.entity.startDate,
                collectionDateTime: model.collectionDate
            }
        };
    }

/*
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

*/

    service.submit = function(fieldWorker, collectionDate, entity) {
        var model = {
            fieldWorker: fieldWorker,
            collectionDate: collectionDate,
            entity: entity
        };
        return EntityService.submit(urlBase, Request, model);
    };

    return service;
}
