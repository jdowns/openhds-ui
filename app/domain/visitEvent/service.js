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


    service.getEventsByVisit = function(visitUuid) {

        var uuid = visitUuid;
        var url = $rootScope.restApiUrl + '/visits/getEvents?visitUuid=' + uuid;
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

    service.deleteEntity = function(id, type) {
        var url;
        switch(type) {
        case "inMigration":
            url = $rootScope.restApiUrl + "/inMigrations/" + id;
            break;
        case "outMigration":
            url = $rootScope.restApiUrl + "/outMigrations/" + id;
            break;
        case "death":
            url = $rootScope.restApiUrl + "/deaths/" + id;
            break;
        case "pregnancyObservation":
            url = $rootScope.restApiUrl + "/pregnancyObservations/" + id;
            break;
        case "pregnancyOutcome":
            url = $rootScope.restApiUrl + "/pregnancyOutcomes/" + id;
            break;
        case "pregnancyResult":
            url = $rootScope.restApiUrl + "/pregnancyResults/" + id;
            break;
        }

        $http.delete(url, service.getHeaders()).then(
            function(result) {
                console.log(result);
            }
        );
    };

    service.submitEdited = function(temp, type) {
        var url;
        var model;
        switch(type) {
            case "inMigration":
                url = $rootScope.restApiUrl + "/inMigrations/";
                model = {
                    uuid : temp.uuid,
                    origin : temp.origin,
                    reason : temp.reason,
                    migrationType : temp.migrationType
                };
                break;
            case "outMigration":
                url = $rootScope.restApiUrl + "/outMigrations/";
                model = {
                    uuid : temp.uuid,
                    destination : temp.destination,
                    reason : temp.reason,
                    migrationType : temp.migrationType
                };
                break;
            case "death":
                url = $rootScope.restApiUrl + "/deaths/";
                model = {
                    uuid : temp.uuid,
                    placeOfDeath : temp.placeOfDeath,
                    cause : temp.cause
                };
                break;
            /* TODO:  needed?
            case "pregnancyObservation":
                url = $rootScope.restApiUrl + "/pregnancyObservations/";
                model = {
                    uuid : temp.uuid,
                    origin : temp.origin,
                    reason : temp.reason,
                    migrationType : temp.migrationType
                };
                break;
            case "pregnancyOutcome":
                url = $rootScope.restApiUrl + "/pregnancyOutcomes/";
                model = {
                    uuid : temp.uuid,
                    origin : temp.origin,
                    reason : temp.reason,
                    migrationType : temp.migrationType
                };
                break;
             */
            default:
                break;
        }


        return EntityService.submitEdited(url, model);
    };


    return service;
}
