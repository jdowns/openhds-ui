'use strict';

angular.module('openhds')
    .service('SocialGroupService',
             ['$rootScope', '$http', SocialGroupService]);

function SocialGroupService($rootScope, $http) {
    var service = this;
    var headers = {
        headers: {
            authorization: "Basic " + $rootScope.credentials
        }
    };

    function Request(model) {
        return {
            collectedByUuid: model.fieldworker.uuid,
            socialGroup: {
                groupName: model.socialGroup.groupName,
                extId: model.socialGroup.extId,
                groupType: model.socialGroup.groupType,
                collectionDateTime: model.collectionDateTime
            }
        };
    }

    service.submitOne = function(model) {
        var url = $rootScope.restApiUrl + "/socialGroups";
        var request = Request(model);
        $http.post(url, request, headers);
    };

    service.submit = function(model, callback) {
        Promise.all(model.socialGroups.map(service.submitOne))
            .then(function(response) {
                callback(response);
            });
    };

    return service;
}
