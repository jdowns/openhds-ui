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
            individualUuid: model.entity.individual.uuid,
            socialGroupUuid: model.entity.socialGroup.uuid,
            membership: {
                startType: model.entity.startType,
                startDate: model.entity.startDate,
                collectionDateTime: model.collectionDate
            }
        };
    }


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
