'use strict';

angular.module('openhds')
    .service('IndividualService',
             ['$rootScope', '$http', IndividualService]);

function IndividualService($rootScope, $http) {
    var service = this;
    var headers = {
        headers: {
            authorization: "Basic " + $rootScope.credentials
        }
    };

    function Request(fieldWorker, collectionDate, model) {
        return {
            collectedByUuid: fieldWorker.uuid,
            individual: {
                firstName: model.firstName,
                lastName: model.lastName,
                dateOfBirth: model.dateOfBirth,
                extId: model.extId,
                gender: model.gender,
                collectionDateTime: collectionDate
            }
        };
    }

    service.submitOne = function(fieldWorker, collectionDate, model) {
        var url = $rootScope.restApiUrl + "/individuals";
        var request = Request(fieldWorker, collectionDate, model);
        return $http.post(url, request, headers);
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

        return Promise.all(model.individuals.map(submitModel()));
    };

    return service;
}
