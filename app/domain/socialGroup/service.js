'use strict';

angular.module('openhds')
    .service('SocialGroupService',
             ['EntityService', SocialGroupService]);

function SocialGroupService(EntityService) {
    var service = this;
    var urlBase = '/socialGroups'

    function Request(model) {
        return {
            collectedByUuid: model.fieldWorker.uuid,
            socialGroup: {
                groupName: model.entity.groupName,
                extId: model.entity.extId,
                groupType: model.entity.groupType,
                collectionDateTime: model.collectionDate
            }
        };
    }

    function Response(entity) {
        return {
            uuid: entity.uuid,
            extId: entity.extId,
            groupName: entity.groupName,
            groupType: entity.groupType
        };
    }

    service.getAllSocialGroups = function() {
        return EntityService.getBulk(urlBase, Response);
    };

    service.getByExtId = function(extId) {
        return EntityService.getByExtId(urlBase, Response, extId);
    };


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
