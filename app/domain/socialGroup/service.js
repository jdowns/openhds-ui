'use strict';

angular.module('openhds')
    .service('SocialGroupService',
             ['EntityService', SocialGroupService]);

function SocialGroupService(EntityService) {
    var service = this;
    var urlBase = '/socialGroups';

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

    service.getByFieldWorker = function(id) {
        return EntityService.getByFieldWorker(urlBase, Response, id);
    };

    service.getBySearch = function(entityList) {
        return EntityService.getBySearch(urlBase, Response, entityList);

    };

    service.submit = function(fieldWorker, collectionDate, entity) {
        var model = {
            fieldWorker: fieldWorker,
            collectionDate: collectionDate,
            entity: entity
        };
        return EntityService.submit(urlBase, Request, model);
    };

    service.submitEdited = function(socialGroup) {
        var model = {
            uuid : socialGroup.uuid,
            groupName : socialGroup.groupName,
            groupType : socialGroup.groupType
        };
        return EntityService.submitEdited(urlBase, model);
    };

    service.delete = function(id, reason, success, failure) {
        EntityService.safeDelete(urlBase, id, reason)
            .then(function(response) {
                console.log(response.data);
            });
    };

    service.getExtId = function() {
        var data = {};
        return EntityService.getExtId(urlBase, 'SocialGroup', data);
    };

    service.validateExtId = function(id) {
        var data = {};
        return EntityService.validateExtId(urlBase, 'SocialGroup', id, data);
    };

    return service;
}
