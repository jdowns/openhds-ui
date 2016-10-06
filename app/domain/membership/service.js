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

    function Request(fieldWorker, collectionDate, model) {
        return {
            collectedByUuid: fieldWorker.uuid,
            membership: {
                individual: model.individual,
                socialGroup: model.socialGroup,
                startType: model.startType,
                startDate: model.startDate,
                collectionDateTime: collectionDate
            }
        };
    }

    service.submitOne = function(fieldWorker, collectionDate, model) {
        var url = $rootScope.restApiUrl + "/memberships";
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

        var result = model.memberships.map(submitModel());
        return result;
    };

    return service;
}
