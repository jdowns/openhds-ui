angular.module('openHDS.censusService', ['openHDS.model']).factory('CensusBackendService', ['$http', 'Model', function($http, Model) {

    function hash(pw) {
        return pw;
    }

    function validate(fw, username, password) {
        return fw.fieldWorkerId == username && fw.passwordHash == hash(password);
    }

    function loggedIn(scope) {
        return scope.model.fieldWorker;
    }

    function bulk(server) {
        return $http.get(server + "/fieldWorkers/bulk");
    }

    function login(scope, server, username, password) {
        bulk(server).then(
            function(response) {
                response.data.forEach(function(fw) {
                    if (validate(fw, username, password)) {
                        scope.model.fieldWorker = { uuid: fw.uuid };
                    }
                });
                if (scope.model.fieldWorker != undefined) {
                    scope.errors = undefined;
                } else {
                    scope.errors = "Invalid login credentials";
                }
            }
        );
    }


    function createLocation(scope) {
        scope.model.location = new Model.Location(scope.Date(), scope.model.locationBinding);
        var url = scope.model.login.backend + '/locations';
        console.log(url);
        $http.post(url, scope.model.location)
            .then(
            function(response) {
                scope.model.location = response.data;
            }
        );
    }

    fieldWorkers = {
        login: login,
        createLocation: createLocation,
    };
    return fieldWorkers;
}]);