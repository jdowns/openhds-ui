'use strict';

angular.module('openhds')
    .service('FieldWorkerService',
             ['EntityService', FieldWorkerService]);

function FieldWorkerService(EntityService) {
    var service = this;
    var urlBase = '/fieldWorkers';

    function FieldWorker(json) {
        return {
            uuid: json.uuid,
            id: json.fieldWorkerId,
            firstName: json.firstName,
            lastName: json.lastName
        };
    }

    service.getAllFieldWorkers = function(callback) {
        return EntityService.getBulk(urlBase, FieldWorker);
    };

    return service;
}
