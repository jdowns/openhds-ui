'use strict';

angular.module('openhds')
    .service('SocialGroupService',
             ['$rootScope', '$http', '$q', SocialGroupService]);

function SocialGroupService($rootScope, $http, $q) {
    var service = this;

    function getHeaders() {
        return {
            headers: {
                authorization: "Basic " + $rootScope.credentials
            }
        };

    }
    function Request(fieldWorker, collectionDate, model) {
        return {
            collectedByUuid: fieldWorker.uuid,
            socialGroup: {
                groupName: model.groupName,
                extId: model.extId,
                groupType: model.groupType,
                collectionDateTime: collectionDate
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
        var url = $rootScope.restApiUrl + '/socialGroups/bulk.json';
        return $q(function(resolve, reject) {
            $http.get(url, getHeaders()).then(
                function(response) {
                    var entities = response.data.map(Response);
                    resolve(entities);
                });
        });
    };

    service.submitOne = function(fieldWorker, collectionDate, model) {
        var url = $rootScope.restApiUrl + "/socialGroups";
        var request = Request(fieldWorker, collectionDate, model);
        var response = $http.post(url, request, getHeaders());
        return response;
    };

    service.submit = function(model, callback) {

        var fieldWorker = model.currentFieldworker;
        var collectionDate = model.collectionDateTime;

        function submitModel() {
            return function(model) {
                return service.submitOne(fieldWorker, collectionDate, model);
            };
        }
        var result = model.socialGroups.map(submitModel());
        return Promise.all(result);
    };

    return service;
}
