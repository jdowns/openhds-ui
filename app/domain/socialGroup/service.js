'use strict';

angular.module('openhds')
    .service('SocialGroupService',
             ['$rootScope', '$http', SocialGroupService]);

function SocialGroupService($rootScope, $http) {
    var service = this;
    var headers;
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



    service.submitOne = function(fieldWorker, collectionDate, model) {
        var url = $rootScope.restApiUrl + "/socialGroups";
        var request = Request(fieldWorker, collectionDate, model);
        return $http.post(url, request, headers);
    };

    service.submit = function(model) {
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
        var result = model.socialGroups.map(submitModel());
        return Promise.all(result);
    };

    return service;
}
