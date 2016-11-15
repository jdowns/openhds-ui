'use strict';

angular.module('openhds')
    .service('VisitEventService',
        ['$rootScope','$http','$q','EntityService', VisitEventService ]);

function VisitEventService($rootScope, $http, $q, EntityService) {
    var service = this;
    var urlBase = '/relationships';

    service.getHeaders = function() {
        return {
            headers: {
                authorization: "Basic " + $rootScope.credentials
            }
        };
    };

    service.getEventsByIndividual = function(individualUuid) {

        var uuid = individualUuid;
        var url = $rootScope.restApiUrl + '/individuals/getEvents?individualUuid=' + uuid;
        var responsePromise = $http.get(url, service.getHeaders());

        return $q(function(resolve, reject) {
            responsePromise.then(
                function(response) {
                    console.log(response);
                    var entities = response.data;
                    resolve(entities);
                }
            );
        });
    };


    return service;
}
