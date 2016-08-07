'use strict';

angular.module('openHDS.core').factory('AppState', AppState);

AppState.$inject = [];

function AppState() {
    console.log("Init app state");
    var vm = this;
    vm.loadData = loadData;

    function loadData() {
        BackendService.get("/projectCode/locationType")
            .then(
                function (response) {
                    vm.locationCodes = response.data;
                },
                function (response) {
                    console.log("Unable to fetch project codes! " + JSON.stringify(response));
                }
            );
        BackendService.get("/locationHierarchy")
            .then(
                function (response) {
                    vm.hierarchies = response.data;
                },
                function (response) {
                    console.log("Unable to fetch location hierarchies! " + JSON.stringify(response));
                }
            );
        BackendService.get("/projectCode/socialGroupType")
            .then(
                function (response) {
                    console.log(JSON.stringify(response));
                    vm.groupTypeCodes = response.data;
                },
                function (response) {
                    console.log("Unable to fetch project codes! " + JSON.stringify(response));
                }
            );
        BackendService.get("/projectCode/gender")
            .then(
                function(response) {
                    console.log(JSON.stringify(response));
                    vm.genderCodes = response.data;
                },
                function(response) {
                    console.log("Unable to fetch project codes! " + JSON.stringify(response));
                }
            );
        BackendService.get("/projectCode/membershipType")
            .then(
                function(response) {
                    console.log(JSON.stringify(response));
                    vm.membershipCodes = response.data;
                },
                function(response) {
                    console.log("Unable to fetch project codes! " + JSON.stringify(response));
                }
            );
        BackendService.get("/projectCode/migrationType")
            .then(
                function(response) {
                    console.log(JSON.stringify(response));
                    vm.residencyCodes = response.data;
                },
                function(response) {
                    console.log("Unable to fetch project codes! " + JSON.stringify(response));
                }
            );
        BackendService.get("/projectCode/membershipType")
            .then(
                function(response) {
                    console.log(JSON.stringify(response));
                    vm.membershipCodes = response.data;
                },
                function(response) {
                    console.log("Unable to fetch project codes! " + JSON.stringify(response));
                }
            );
        BackendService.get("/projectCode/relationshipType")
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