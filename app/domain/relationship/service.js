'use strict';

angular.module('openhds')
    .service('RelationshipService',
             ['$rootScope', '$http', RelationshipService]);

function RelationshipService($rootScope, $http) {
    var service = this;
    var headers = {
        headers: {
            authorization: "Basic " + $rootScope.credentials
        }
    };

    function Request(fieldWorker, collectionDate, model) {
        return {
            collectedByUuid: fieldWorker.uuid,
            relationship: {
                individualA: model.individualA,
                individualB: model.individualB,
                relationshipType: model.relationshipType,
                startDate: model.startDate,
                collectionDateTime: collectionDate
            }
        };
    }

    service.submitOne = function(fieldWorker, collectionDate, model) {
        var url = $rootScope.restApiUrl + "/relationships";
        var request = Request(fieldWorker, collectionDate, model);
        $http.post(url, request, headers);
    };

    service.submit = function(model, callback) {
        headers = {
            headers: {
                authorization: "Basic " + $rootScope.credentials
            }
        };
        var fieldWorker = model.currentFieldworker;
        var collectionDate = model.collectionDateTime;

        function submitModel() {
            return function(model) {
                return service.submitOne(fieldWorker, collectionDate, model);
            };
        }

        var result = model.relationships.map(submitModel());
        return result;
    };

    return service;
}
