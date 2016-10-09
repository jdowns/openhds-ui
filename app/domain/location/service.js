'use strict';

angular.module('openhds')
    .service('LocationService',
             ['EntityService', LocationService]);

function LocationService(EntityService) {
    var service = this;
    var urlBase = '/locations'

    function Request(model) {
        return {
            collectedByUuid: model.currentFieldworker.uuid,
            locationHierarchyUuid: model.currentHierarchy.uuid,
            location: {
                name: model.location.name,
                extId: model.location.extId,
                type: model.location.type,
                collectionDateTime: model.collectionDateTime
            }
        };
    }

    function Response(data) {
        return {
            uuid: data.uuid,
            name: data.name,
            extId: data.extId,
            type: data.type,
            description: data.description
        };
    }

    service.getByHierarchy = function(uuid) {
        return EntityService.getByHierarchy(urlBase, Response, uuid);
    }

    service.submit = function(model) {
        return EntityService.submit(urlBase, Request, model);
    }

    return service;
};
