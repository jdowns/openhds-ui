'use strict';

angular.module('openhds')
    .service('MembershipService',
             ['$rootScope', '$http', MembershipService]);

function MembershipService($rootScope, $http) {
    var service = this;
    var headers = {
        headers: {
            authorization: "Basic " + $rootScope.credentials
        }
    };

    function Request(model) {
        return {
            collectedByUuid: model.currentFieldWorker,
            relationship: {
                individualA: model.relationships[index].individualA,
                individualB: model.relationships[index].individualB,
                relationshipType: model.relationships[index].relationshipType,
                startDate: model.relationships[index].startDate,
                collectionDateTime: model.collectionDateTime
            }
        };
    }

    service.submitOne = function(model) {
        var url = $rootScope.restApiUrl + "/memberships";
        var request = Request(model);
        $http.post(url, request, headers);
    };

    service.submit = function(model, callback) {
        Promise.all(model.membership.map(service.submitOne))
            .then(function(response) {
                callback(response);
            });
    };

    return service;
}
