'use strict';

angular.module('openHDS.core').factory('AppState', AppState);

AppState.$inject = ['$http'];

function AppState($http) {
    console.log("Init app state");
    var vm = this;
    vm.loadData = loadData;
    vm.loadLocationType = loadLocationType;

    function loadLocationType(callback) {
        $http.get("/api/projectcode/locationType")
            .then(
                function (response) {
                    vm.locationCodes = response.data;
                    callback(response.data);
                },
                function (response) {
                    console.log("Unable to fetch project codes! " + JSON.stringify(response));
                }
            );
    }

    function loadData() {

        $http.get("/api/locationHierarchy")
            .then(
                function (response) {
                    vm.hierarchies = response.data;
                },
                function (response) {
                    console.log("Unable to fetch location hierarchies! " + JSON.stringify(response));
                }
            );
        $http.get("/api/projectCode/socialGroupType")
            .then(
                function (response) {
                    console.log(JSON.stringify(response));
                    vm.groupTypeCodes = response.data;
                },
                function (response) {
                    console.log("Unable to fetch project codes! " + JSON.stringify(response));
                }
            );
        $http.get("/api/projectCode/gender")
            .then(
                function(response) {
                    console.log(JSON.stringify(response));
                    vm.genderCodes = response.data;
                },
                function(response) {
                    console.log("Unable to fetch project codes! " + JSON.stringify(response));
                }
            );
        $http.get("/api/projectCode/membershipType")
            .then(
                function(response) {
                    console.log(JSON.stringify(response));
                    vm.membershipCodes = response.data;
                },
                function(response) {
                    console.log("Unable to fetch project codes! " + JSON.stringify(response));
                }
            );
        $http.get("/api/projectCode/migrationType")
            .then(
                function(response) {
                    console.log(JSON.stringify(response));
                    vm.residencyCodes = response.data;
                },
                function(response) {
                    console.log("Unable to fetch project codes! " + JSON.stringify(response));
                }
            );
        $http.get("/api/projectCode/membershipType")
            .then(
                function(response) {
                    console.log(JSON.stringify(response));
                    vm.membershipCodes = response.data;
                },
                function(response) {
                    console.log("Unable to fetch project codes! " + JSON.stringify(response));
                }
            );
        $http.get("/api/projectCode/relationshipType")
            .then(
                function(response) {
                    console.log(JSON.stringify(response));
                    vm.relationshipTypeCodes = response.data;
                },
                function(response) {
                    console.log("Unable to fetch project codes! " + JSON.stringify(response));
                }
            );
    }

    return vm;
}
