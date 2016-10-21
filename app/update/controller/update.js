'use strict';

angular.module('UpdateModule', [])
    .controller('UpdateController',
                ['$rootScope',
                    '$http',
                    'LocationHierarchyService',
                    'FieldWorkerService',
                    'LocationService',
                    'SocialGroupService',
                    'IndividualService',
                    'MembershipService',
                    'RelationshipService',
                    UpdateController ]);


function UpdateController($rootScope,
                          $http,
                          LocationHierarchyService,
                          FieldWorkerService,
                          LocationService,
                          SocialGroupService,
                          IndividualService,
                          MembershipService,
                          RelationshipService) {

    var vm = this;
    var headers = { authorization: "Basic " + $rootScope.credentials };

    vm.selectedLocation = null;
    vm.selectedIndividual = null;
    vm.submittedEvents = [];


    vm.currentInMigration = null;
    vm.currentOutMigration = null;
    vm.currentDeath = null;
    vm.currentPregnancyObservation = null;
    vm.currentPregnancyOutcome = null;

    vm.submitInMigration = function(){
        // post logic
        // add to submitted events []
        vm.currentInMigration = null;
    };

    vm.submitOutMigration = function(){
        // post logic
        // add to submitted events []
        vm.currentOutMigration = null;
    };

    vm.submitDeath = function(){
        // post logic
        // add to submitted events []
        vm.currentDeath = null;
    };

    vm.submitPregnancyObservation = function(){
        // post logic
        // add to submitted events []
        vm.currentPregnancyObservation = null;
    };

    vm.submitPregnancyOutcome = function(){
        // post logic
        // add to submitted events []
        vm.currentPregnancyOutcome = null;
    };


    vm.finishVisit = function(){
        vm.submittedEvents = [];
        vm.selectedLocation = null;
        vm.selectedIndividual = null;
    };

    vm.saveLocationHierarchy = function() {
        var parentIndex = vm.selectedHierarchy.length - 2;
        var lastIndex = vm.selectedHierarchy.length - 1;

        var parent = vm.selectedHierarchy[parentIndex];
        var last = vm.selectedHierarchy[lastIndex];
        var children = vm.locationHierarchies[parent];
        vm.currentHierarchy = children.filter(function(child) {
            return child.uuid === last;
        })[0];

        LocationService.getByHierarchy(vm.currentHierarchy.uuid)
            .then(function(response) {
                console.log(response);
                vm.allLocations = response;
                vm.locationDisplayCollection = [].concat(response);
            });

        IndividualService.getByHierarchy(vm.currentHierarchy.uuid)
            .then(function(response) {
                console.log(response);
                vm.allIndividuals = response;
                vm.individualDisplayCollection = [].concat(response);
            });
        IndividualService.getByHierarchy(vm.currentHierarchy.uuid)
            .then(function(response) {
                console.log(response);
                vm.allIndividuals = response;
                vm.individualDisplayCollection = [].concat(response);
            });
    };


    vm.init = function() {


        var codesUrl = $rootScope.restApiUrl + "/projectCodes/bulk.json";

        $http.get(codesUrl, {headers: headers})
            .then(function(response) {
                vm.codes = response.data;
            });

        FieldWorkerService.getAllFieldWorkers().then(function(fieldworkers) {
            vm.allFieldWorkers = fieldworkers;
        });

        LocationHierarchyService.locationHierarchies().then(function(hierarchyTree) {
            vm.locationHierarchies = hierarchyTree;
        });
        LocationHierarchyService.getLevels().then(function(response) {
            vm.allHierarchyLevels = response.data;
        });



    };

    return vm;

}
