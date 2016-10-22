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
                 'ResidencyService',
                 'DeathService',
                 UpdateController ]);


function UpdateController($rootScope,
                          $http,
                          LocationHierarchyService,
                          FieldWorkerService,
                          LocationService,
                          SocialGroupService,
                          IndividualService,
                          MembershipService,
                          RelationshipService,
                          ResidencyService,
                          DeathService) {

    var vm = this;
    var headers = { authorization: "Basic " + $rootScope.credentials };

    vm.selectedHierarchy = [];


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

    vm.submitDeath = function() {
        DeathService.submit(vm.currentFieldWorker, vm.collectionDateTime, vm.currentVisit, vm.currentIndividual, vm.currentDeath)
            .then(function(response) {
                console.log(response.data);
                vm.submittedEvents.push(response.data);
            });
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

        ResidencyService.getByHierarchy(vm.currentHierarchy.uuid)
            .then(function(response) {
                console.log(response);
                vm.allResidencies = response;
                vm.residencyDisplayCollection = [].concat(response);
            });


    };

    vm.setLocation = function(row) {
        vm.selectedLocation = row;

        vm.residencies = vm.allResidencies.filter(function(location){
            return location.uuid === row.uuid;
        });




    };

    vm.availableHierarchies = function() {
        var result = [];

        vm.selectedHierarchy.forEach(function(h) {
            result.push(vm.locationHierarchies[h]);
        });
        return result;
    };

    vm.saveFieldWorker = function() {
        var result = vm.allFieldWorkers.filter(
            function(fw) {
                return fw.uuid === vm.currentFieldWorkerUuid;
            });
        vm.currentFieldWorker = result[0];
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
