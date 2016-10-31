'use strict';

angular.module('UpdateModule', [])
    .controller('UpdateController',
                ['$rootScope',
                 '$http',
                 'LocationHierarchyService',
                 'FieldWorkerService',
                 'LocationService',
                 'IndividualService',
                 'MembershipService',
                 'RelationshipService',
                 'ResidencyService',
                 'VisitService',
                 'DeathService',
                 'InMigrationService',
                 'OutMigrationService',
                 'PregnancyObservationService',
                 'PregnancyOutcomeService',
                 'PregnancyResultService',
                 UpdateController ]);


function UpdateController($rootScope,
                          $http,
                          LocationHierarchyService,
                          FieldWorkerService,
                          LocationService,
                          IndividualService,
                          MembershipService,
                          RelationshipService,
                          ResidencyService,
                          VisitService,
                          DeathService,
                          InMigrationService,
                          OutMigrationService,
                          PregnancyObservationService,
                          PregnancyOutcomeService,
                          PregnancyResultService) {

    var vm = this;
    var headers = { authorization: "Basic " + $rootScope.credentials };

    vm.selectedHierarchy = [];


    vm.selectedLocation = null;
    vm.selectedIndividual = null;
    vm.submittedEvents = [];

    vm.submittedVisits = [];


    vm.currentResidency = null;
    vm.currentInMigration = null;
    vm.currentOutMigration = null;
    vm.currentDeath = null;
    vm.currentPregnancyObservation = null;
    vm.currentPregnancyOutcome = null;

    vm.setFather = function(row) {
        if (vm.currentPregnancyOutcome === null) {
            vm.currentPregnancyOutcome = {father: row};
        } else {
            vm.currentPregnancyOutcome.father = row;
        }
        console.log(vm.currentPregnancyOutcome);
    };

    vm.submitVisit = function() {
        VisitService.submit(vm.currentFieldWorker, vm.visitDate, vm.selectedLocation, vm.visit)
            .then(function(response) {
                vm.currentVisit = response.data;
            });
        $('#eventTab').tab('show');
    };

    vm.submitInMigration = function(event){
        InMigrationService.submit(vm.currentFieldWorker, vm.currentVisit.visitDate,
            vm.currentVisit, vm.currentIndividual, vm.currentResidency, event)
            .then(function(response) {
                vm.submittedEvents.push(response.data);
            });
        vm.currentInMigration = null;
    };

    vm.submitOutMigration = function(event){
        console.log(vm.currentResidency);
        OutMigrationService.submit(vm.currentFieldWorker, vm.collectionDateTime,
            vm.currentVisit, vm.currentIndividual, vm.currentResidency, event)
            .then(function(response) {
                vm.submittedEvents.push(response.data);
            });
        vm.currentOutMigration = null;
    };

    vm.submitDeath = function(event) {
        DeathService.submit(vm.currentFieldWorker, vm.collectionDateTime, vm.currentVisit, vm.currentIndividual, event)
            .then(function(response) {
                var event = {
                    uuid: response.data.uuid,
                    individual: vm.currentIndividual,
                    eventType: "death"
                };
                vm.submittedEvents.push(event);
            });
        vm.currentDeath = null;
    };

    vm.submitPregnancyObservation = function(event) {
        PregnancyObservationService.submit(vm.currentFieldWorker, vm.collectionDateTime, vm.currentVisit, vm.currentIndividual, event)
            .then(function(response) {
                var event = {
                    uuid: response.data.uuid,
                    individual: vm.currentIndividual,
                    eventType: "pregnancy observation"
                };
                vm.submittedEvents.push(event);
                vm.currentPregnancyObservation = null;
            });
    };

    vm.submitPregnancyOutcome = function(outcome, result){
        PregnancyOutcomeService.submit(vm.currentFieldWorker, vm.collectionDateTime, vm.currentVisit,
                                       vm.currentIndividual, vm.currentPregnancyOutcome.father, vm.currentPregnancyOutcome)
            .then(function(outcomeResponse) {
                var event = {
                    uuid: outcomeResponse.data.uuid,
                    individual: vm.currentIndividual,
                    eventType: "pregnancy outcome"
                };
                vm.submittedEvents.push(event);

                if (vm.currentPregnancyResult.type === 'LIVE_BIRTH') {
                    IndividualService.submit(vm.currentFieldWorker, vm.currentVisit.visitDate, result.child)
                        .then(function(childResponse) {
                            PregnancyResultService.submit(vm.currentFieldWorker,
                                                          vm.currentVisit.visitDate,
                                                          vm.currentVisit,
                                                          outcomeResponse.data,
                                                          childResponse.data,
                                                          result)
                                .then(function(response) {
                                    var event = {
                                        uuid: response.data.uuid,
                                        individual: childResponse.uuid,
                                        eventType: "pregnancy result"
                                    };
                                    vm.submittedEvents.push(event);
                                });
                        });
                    vm.currentPregnancyOutcome = null;
                    vm.currentPregnancyResult = null;
                }
                else {
                    PregnancyResultService.submit(vm.currentFieldWorker, vm.currentVisit.visitDate,
                                                  vm.currentVisit, outcomeResponse, {}, vm.currentPregnancyResult)
                        .then(function(response) {
                            var event = {
                                uuid: response.uuid,
                                individual: null,
                                eventType: "pregnancy result"
                            };
                            vm.submittedEvents.push(event);
                            vm.currentPregnancyOutcome = null;
                            vm.currentPregnancyResult = null;
                        });
                }
            });
    };

    // For External In-Migration
    vm.submitIndividual = function(indiv){
        IndividualService.submit(vm.currentFieldWorker,
                                 vm.currentVisit.visitDate,
                                 indiv)
            .then(function(response) {
                console.log(response.data);
                vm.currentIndividual = response.data;
            });
    };

    vm.pregnancyDisableCheck = function(){
        if(vm.currentIndividual == null){
            return false;
        }
        else if( vm.currentIndividual.gender == "MALE"){
            return false;
        }
        else{
            return true;
        }
    };


    vm.finishVisit = function(){

        vm.submittedVisits.push(vm.currentVisit);
        vm.currentVisit = null;
        vm.visit = null;

        vm.submittedEvents = [];
        vm.selectedLocation = null;
        vm.selectedIndividual = null;
        $('#updateTab').tab('show');


    };

    vm.migrationTypes = [
        {
            display: "Internal",
            codeValue : "INTERNAL_MIGRATION",
            description : "migrated between locations in the study area"
        },
        {
            display: "External",
            codeValue : "EXTERNAL_MIGRATION",
            description : "migrated from a location outside the study area"
        }
    ];


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
                vm.allLocations = response;
                vm.locationDisplayCollection = [].concat(response);
            });

    };
    vm.setCurrentIndividual = function(row) {
        vm.currentIndividual = row;
        if (vm.residencies === null) {
            vm.currentResidency = {uuid: "UNKNOWN"};
        } else {
            vm.currentResidency = vm.residencies.filter(function(res) {
                return res.individual.uuid === vm.currentIndividual.uuid;
            })[0];
        }
    };
    vm.setLocation = function(row) {
        vm.selectedLocation = row;



        IndividualService.getByLocation(row.uuid).then(function(response){
            vm.allIndividuals = response;
            vm.individualDisplayCollection = [].concat(response);

        });

        vm.residencies = vm.allResidencies.filter(function(residency){
            return residency.location.uuid === row.uuid;
        }
    };

    vm.availableHierarchies = function() {
        var result = [];

        vm.selectedHierarchy.forEach(function(h) {
            result.push(vm.locationHierarchies[h]);
        });
        return result;
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
