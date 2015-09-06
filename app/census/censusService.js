angular.module('openHDS.censusService', ['ngRoute']).factory('CensusBackendService', ['$http', function($http) {

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


    function fwbulk(backend) {

        $http.get(backend + "/fieldWorkers/bulk").then(
            function(response) {
                response.data.forEach(function(fw) {
                    if (validate(fw, $scope, username, password)) {
                        $scope.model.fieldWorker = { uuid: fw.uuid };
                    }
                });
                if ($scope.model.fieldWorker != undefined) {
                    $scope.errors = undefined;
                    $scope.navigation.startNewLocation();
                } else {
                    $scope.errors = "Invalid login credentials";
                }
            });
    }

    fieldWorkers = {
        login: login
    };
    return fieldWorkers;
}]);