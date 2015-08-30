'use strict';

angular.module('openHDS.census', [])
    .controller('CensusController', ['$scope', '$http', function($scope, $http) {

        $scope.createLocation = function(collectedBy, externalId, name, locationType, parent) {
            $scope.location = new $scope.Location(new Date(), collectedBy, externalId, name, locationType, parent);
            $scope.fieldWorkerId = collectedBy;
            $http.post($scope.server, $scope.location)
                .then(
                    function(response) {
                        $scope.location.uuid = response.data
                    },
                    function(response) {

                    }
                );
        };

        $scope.Location = function(collectionDate, collectedBy, externalId, name, locationType, parent) {
            this.collectionDate = collectionDate;
            this.collectedBy = collectedBy;
            this.externalId = externalId;
            this.name = name;
            this.locationType = locationType;
            this.parent = parent;
        };

        $scope.setServer = function(server) {
            $scope.server = server;
        }

    }]);