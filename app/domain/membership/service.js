'use strict';

angular.module('openhds')
    .service('MembershipService',
        ['$rootScope','$http','$q','EntityService', MembershipService]);


function MembershipService( $rootScope, $http, $q, EntityService) {
    var service = this;
    var urlBase = '/memberships';

    service.getHeaders = function() {
        return {
            headers: {
                authorization: "Basic " + $rootScope.credentials
            }
        };
    };

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

    service.getMembershipsByIndividual = function(individualUuid) {

        var uuid = individualUuid;
        var url = $rootScope.restApiUrl + '/individuals/getMemberships?individualUuid=' + uuid;
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


    service.getMembershipsBySocialGroup = function(socialGroupUuid) {

        var uuid = socialGroupUuid;
        var url = $rootScope.restApiUrl + '/socialGroups/getMemberships?socialGroupUuid=' + uuid;
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

    service.delete = function(id) {
        var url = $rootScope.restApiUrl + "/memberships/" + id;

        return $http.delete(url, service.getHeaders());
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
