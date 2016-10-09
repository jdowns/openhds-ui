'use strict';

angular.module('openhds')
    .service('IndividualService',
             ['$rootScope', '$http', '$q', IndividualService]);

function IndividualService($rootScope, $http, $q) {
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

    function getHeaders() {
        return {
            headers: {
                authorization: "Basic " + $rootScope.credentials
            }
        };

    }

    service.submitOne = function(fieldWorker, collectionDate, model) {
        var url = $rootScope.restApiUrl + "/individuals";
        var request = Request(fieldWorker, collectionDate, model);
        return $http.post(url, request, headers);
    };

    service.getByHierarchy = function(hierarchyUuid) {
        var url = $rootScope.restApiUrl + "/individuals.json" + '?locationHierarchyUuid=' + hierarchyUuid;
        var individualsPromise = $http.get(url, getHeaders());

        return $q(function(resolve, reject) {
            individualsPromise.then(
                function(response) {
                    var individuals = response.data.content.map(
                        function(ind) {
                            return {
                                extId: ind.extId,
                                firstName: ind.firstName,
                                lastName: ind.lastName,
                                dateOfBirth: ind.dateOfBirth,
                                gender: ind.gender
                                };
                        });
                    resolve(individuals);
                }
            );
        });
    };


    service.submit = function(model, callback) {

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
