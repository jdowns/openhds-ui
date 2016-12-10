'use strict';

angular.module('UpdateModule', ['ui.tree'])
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
                 UpdateController]);

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

    vm.currentEventType = null;
    vm.visitDate = null;
    vm.currentFieldWorker = null;
    vm.currentHierarchy = null;
    vm.visit = {};


    vm.setFather = function(row) {
        if (vm.currentPregnancyOutcome === null) {
            vm.currentPregnancyOutcome = {father: row};
        } else {
            vm.currentPregnancyOutcome.father = row;
        }
        console.log(vm.currentPregnancyOutcome);
    };

    vm.submitVisit = function() {
        VisitService.getExtId().then(function(response) {
            var extId = response.data;
            VisitService.submit(vm.currentFieldWorker, vm.visitDate, vm.selectedLocation, vm.visit, extId)
                .then(function(response) {
                    vm.currentVisit = response.data;
                }, errorHandler);
            $('#eventTab').tab('show');
        });
    };

    vm.submitInMigration = function(event){
        InMigrationService.submit(vm.currentFieldWorker, vm.currentVisit.visitDate,
            vm.currentVisit, vm.individual, vm.currentResidency, event)
            .then(function(response) {
                var event = {
                    uuid: response.data.uuid,
                    individual: vm.individual,
                    eventType: "inMigration"
                };
                vm.submittedEvents.push(event);
            }, errorHandler);

        IndividualService.getByLocation(vm.selectedLocation.uuid).then(function(response){
            vm.allIndividuals = response;
            vm.individualDisplayCollection = [].concat(response);

        });

        vm.currentInMigration = null;
    };

    function headOfHouseholdMigration(individual, callback) {

        MembershipService.getMembershipsByIndividual(individual.uuid)
            .then(function(response) {

                var headMemberships = [];
                if (response.length > 0) {
                    var memberships = response;
                    var headOfHouseholdValue = "SELF"; // TODO: this should check for a value based on project codes, but this handles the common case

                    headMemberships = memberships.filter(function(m) {
                        return m.startType === headOfHouseholdValue;
                    });
                }

                callback();
                if (headMemberships.length > 0) {
                    console.log('Please create a new social group for the remaining members of ' + headMemberships[0].socialGroup.uuid + ' and choose a new head');

                    var groupId = headMemberships[0].socialGroup.uuid;

                    IndividualService.getBySocialGroup(groupId)
                        .then(function(response) {
                            vm.hohGroupUpdate = {
                                individualsToUpdate: response,
                                oldGroup: groupId,
                                oldHead: headMemberships[0].individual.uuid,
                                newGroup: {}
                            };

                            $('#updateHeadOfHouseholdModal').modal('show');

                        });
                }
            });
    }

    vm.submitNewHeadOfHousehold = function(update) {
        // TODO: suggest extId
        //create new group
        //cancel old memberships
        //create new memberships
        console.log('submit new head...')
        console.log(update)
    };

    vm.showUpdateHohModal = function() {
        console.log('show modal')
        $('#updateHeadOfHouseholdModal').modal('show');
    };

    function handleEventSubmit(eventName, individual) {
        return function(response) {
            var event = {
                uuid: response.data.uuid,
                individual: individual,
                eventType: eventName
            };
            vm.submittedEvents.push(event);
        };
    }

    vm.submitOutMigration = function(event) {
        var individual = vm.currentIndividual,
            fieldWorker = vm.currentFieldWorker,
            visitDate = vm.currentVisit.visitDate,
            visit = vm.currentVisit,
            residency = vm.currentResidency;

        headOfHouseholdMigration(individual,
                                 function() {
                                     OutMigrationService.submit(fieldWorker, visitDate, visit, individual, residency, event)
                                         .then(handleEventSubmit('outMigration', individual), errorHandler);
                                     vm.currentOutMigration = null;
                                 });

        IndividualService.getByLocation(vm.selectedLocation.uuid).then(function(response){
            vm.allIndividuals = response;
            vm.individualDisplayCollection = [].concat(response);

        });
    };

    vm.submitDeath = function(event) {
        var individual = vm.currentIndividual,
            fieldWorker = vm.currentFieldWorker,
            collectionDate = vm.collectionDateTime,
            visit = vm.currentVisit;

        headOfHouseholdMigration(individual,
                                 function() {
                                     DeathService.submit(fieldWorker, collectionDate, visit, individual, event)
                                         .then(handleEventSubmit('death', individual), errorHandler);
                                     vm.currentDeath = null;
                                 });

        IndividualService.getByLocation(vm.selectedLocation.uuid).then(function(response){
            vm.allIndividuals = response;
            vm.individualDisplayCollection = [].concat(response);

        });
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
            }, errorHandler);
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
                                }, errorHandler);
                        }, errorHandler);
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
                        }, errorHandler);
                }
            }, errorHandler);
    };

    // For External In-Migration
    vm.submitIndividual = function(indiv){
        IndividualService.submit(vm.currentFieldWorker,
                                 vm.currentVisit.visitDate,
                                 indiv)
            .then(function(response) {
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


    vm.finishVisit = function() {

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


    vm.saveLocationHierarchy = function(hierarchy) {

        vm.currentHierarchy = {
            uuid: hierarchy.id,
            extId: hierarchy.title
        };
        LocationService.getByHierarchy(vm.currentHierarchy.uuid)
            .then(function(response) {
                vm.allLocations = response;
                vm.locationDisplayCollection = [].concat(response);
            }, errorHandler);

    };

    vm.saveSearchHierarchy = function() {
        var parentIndex = vm.selectedHierarchy.length - 2;
        var lastIndex = vm.selectedHierarchy.length - 1;

        var parent = vm.selectedHierarchy[parentIndex];
        var last = vm.selectedHierarchy[lastIndex];
        var children = vm.locationHierarchies[parent];
        vm.searchHierarchy = children.filter(function(child) {
            return child.uuid === last;
        })[0];
    };

    vm.setCurrentIndividual = function(row) {
        vm.currentIndividual = row;
    };

    vm.showCollection = function() {
        console.log(vm.individualDisplayCollection);
    };

    vm.setLocation = function(row) {
        vm.selectedLocation = row;

        IndividualService.getByLocation(row.uuid).then(function(response){
            vm.allIndividuals = response;
            vm.individualDisplayCollection = [].concat(response);

        });
    };

    vm.availableHierarchies = function() {
        var result = [];

        vm.selectedHierarchy.forEach(function(h) {
            result.push(vm.locationHierarchies[h]);
        });
        return result;
    };


    // START : Search for individual ------------------------
    vm.entityType = 'individual';
    vm.queryResult = {
        entityType : 'individual',
        data : [],
        displayCollection : []
    };

    vm.clearResults = function(){
        vm.queryResult.data = [];
        vm.queryResult.displayCollection = [];
    };

    vm.lookupEntity = function(){
        IndividualService.getByExtId(vm.searchExtId)
            .then(function(response) {
                vm.currentEntity = response;
                vm.queryResult.data = response;
                vm.queryResult.displayCollection = [].concat(response);
            }, errorHandler);
    };


    vm.searchByHierarchy = function(){
                IndividualService.getByHierarchy(vm.searchHierarchy.uuid)
                    .then(function(response) {
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    }, errorHandler);

    };

    vm.searchByFields = function(){
        if (vm.currentSearch == null){
            return;
        }
        var tmp = "";
        Object.keys(vm.currentSearch).forEach(function(key){
            if (vm.currentSearch[key] != null){
                tmp = tmp.concat(key + "=" + vm.currentSearch[key] + "&");
            }
        });
        tmp = tmp.substring(0, tmp.length-1);
        IndividualService.getBySearch(tmp)
            .then(function(response){
                vm.queryResult.data = response;
                vm.queryResult.displayCollection = [].concat(response);
            }, errorHandler);
    };


    vm.chooseIndividual = function(row){
        switch(vm.currentEventType){
            case 'pregnancyOutcome':
                vm.setFather(row);
                $("#pregnancyOutcomeCreateModal").modal();
                break;
            case 'inMigration':
                vm.individual = row;
                $("#inMigrationCreateModal").modal();
                break;
            default:
                break;
        }
    };

    // END : Search for individual ------------------------




    vm.init = function() {


        var codesUrl = $rootScope.restApiUrl + "/projectCodes/bulk.json";

        $http.get(codesUrl, {headers: headers})
            .then(function(response) {
                vm.codes = response.data;
            }, errorHandler);

        FieldWorkerService.getAllFieldWorkers().then(function(fieldworkers) {
            vm.allFieldWorkers = fieldworkers;
        }, errorHandler);

        LocationHierarchyService.locationHierarchies().then(function(hierarchyTree) {
            vm.locationHierarchies = hierarchyTree;
        }, errorHandler);
        LocationHierarchyService.getLevels().then(function(response) {
            vm.allHierarchyLevels = response.data;
        }, errorHandler);


    };

    function errorHandler(error) {
        vm.errorMessage = error;
    }

    vm.errorHandler = errorHandler;

    return vm;

}
