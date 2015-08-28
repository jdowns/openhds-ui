angular.module('openHDS.client', [])
    .service('clientService', ['$http', '$location', function($http, $location) {
        this.server = "http://localhost:5000";

        this.username = '';
        this.password = '';
        this.fieldWorkerId = '';

        this.submitForm = function(target, entity, nextPage, errorCallback) {
            data = {
                registrationDateTime: new Date(),
                registrationSystemName: 'OpenHDS Angularjs Client',
                collectionByUUID: 1
            };

            for (var key in entity) {
                data[key] = entity[key];
            }

            $http.post(this.server + target, data)
                .then(
                    function(response) {
                        $location.path(nextPage);
                    },
                    function(response) {
                        errorCallback(response);
                    });
        };
    }]);

