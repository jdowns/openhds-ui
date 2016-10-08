'use strict';

angular.module('LocationModule', [])

    .service('LocationService',
        ['$rootScope', '$http',
            function($rootScope, $http) {
                var service = this;
                var headers;



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

                service.submit = function (model, callback) {
                    headers = {
                        headers: {
                            authorization: "Basic " + $rootScope.credentials
                        }
                    };
                    var url = $rootScope.restApiUrl + "/locations";
                    var request = Request(model);
                    $http.post(url, request, headers).then(function (response) {
                        callback(response.data);
                    });
                };

                return service;
            }]);
