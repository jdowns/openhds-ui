'use strict';

angular.module('BaselineModule', ['ui.tree'])
    .controller('BaselineController',
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
                 BaselineController]);

function BaselineController($rootScope,
                            $http,
                            LocationHierarchyService,
                            FieldWorkerService,
                            LocationService,
                            SocialGroupService,
                            IndividualService,
                            MembershipService,
                            RelationshipService,
                            ResidencyService)
{
    var vm = this;
    var headers = { authorization: "Basic " + $rootScope.credentials };
    vm.selectedHierarchy = [];

    vm.selectedSocialGroups = [];

    vm.displayCollection = [].concat(vm.allSocialGroups);
    vm.displayFieldworkers = [].concat(vm.allFieldWorkers);

    vm.locationDisplayCollection = [];
    vm.individualDisplayCollection = [];

    vm.currentIndividual = null;

    vm.selectedLocation = null;

    vm.selectedIndividuals = [];

    vm.selectedRelationships = [];

    vm.submittedLocations = [];
    vm.submittedMemberships = [];
    vm.submittedRelationships = [];
    vm.submittedResidencies = [];

    //remove to the real data holder
    vm.removeSelectedEntity = function removeItem(key, row) {
        var index = vm[key].indexOf(row);
        if (index !== -1) {
            vm[key].splice(index, 1);
        }
    };


    vm.setLocation = function(row) {
        vm.selectedLocation = row;
    };



    vm.setCurrentIndividual = function(row) {
        vm.currentIndividual = row;
    };


    vm.residencyStartType = "CEN";


    vm.saveLocationHierarchy = function(hierarchy) {
        vm.currentHierarchy = {
            uuid: hierarchy.id,
            extId: hierarchy.title
        };

        console.log('SAVING HIERARCHY ' + vm.currentHierarchy.uuid);


        LocationService.getByHierarchy(vm.currentHierarchy.uuid)
            .then(function(response) {
                vm.allLocations = response;
                vm.locationDisplayCollection = [].concat(response);
            }, errorHandler);

        IndividualService.getByHierarchy(vm.currentHierarchy.uuid)
            .then(function(response) {
                vm.allIndividuals = response;
                vm.individualDisplayCollection = [].concat(response);
            }, errorHandler);

        ResidencyService.getByHierarchy(vm.currentHierarchy.uuid)
            .then(function(response) {
                vm.allResidencies = response;
                vm.residencyDisplayCollection = [].concat(response);
            }, errorHandler);

    };

    vm.availableHierarchies = function() {
        var result = [];

        vm.selectedHierarchy.forEach(function(h) {
            result.push(vm.locationHierarchies[h]);
        });
        return result;
    };

    vm.submitLocation = function(location) {
        LocationService.validateExtId(location.extId).then(function(response) {
            if (response.data === false) {
                vm.errorMessage = {statusText: 'Invalid external ID'};
                return;
            }
            LocationService.submit(vm.currentFieldWorker,
                                   vm.collectionDateTime,
                                   vm.currentHierarchy,
                                   location)
                .then(function(response) {
                    vm.submittedLocations.push(response.data);
                    vm.selectedLocation = response.data;
                    vm.location = {};
                }, errorHandler);
        });
    };

    vm.submitSocialGroup = function(sg) {
        SocialGroupService.validateExtId(sg.extId).then(function(response) {
            if (response.data === false) {
                vm.errorMessage = {statusText: 'Invalid external ID'};
                return;
            }
            SocialGroupService.submit(vm.currentFieldWorker,
                                      vm.collectionDateTime,
                                      sg)
                .then(function(response) {
                    console.log(response.data);
                    vm.selectedSocialGroups.push(response.data);
                    vm.socialGroup = {};
                }, errorHandler);
        });
    };

    vm.submitIndividualAndResidency = function(individual, residency) {
        IndividualService.validateExtId(individual.extId).then(function(response) {
            if(response.data === false) {
                vm.errorMessage = {statusText: 'Invalid external ID'};
                return;
            }
            IndividualService.submit(vm.currentFieldWorker,
                                     vm.collectionDateTime,
                                     individual)
                .then(function(response) {
                    vm.currentIndividual = response.data;
                    vm.submitResidency(residency);
                }, errorHandler);
        });
    };

    vm.selectExistingIndividual = function(indiv){
        vm.currentIndividual = indiv;
        vm.selectedIndividuals.push(indiv);
        var res = { startDate : vm.collectionDateTime};
        vm.submitResidency(res);
    };


    vm.submitIndividual = function(indiv){
        IndividualService.validateExtId(indiv.extId).then(function(response) {
            if(response.data === false) {
                vm.errorMessage = {statusText: 'Invalid external ID'};
                return;
            }
            IndividualService.submit(vm.currentFieldWorker,
                                     vm.collectionDateTime,
                                     indiv)
                .then(function(response) {
                    console.log(response.data);
                    vm.currentIndividual = response.data;
                }, errorHandler);
        });
    };

    vm.submitResidency = function(res) {
        console.log('submitting residency!!');
        ResidencyService.submit(
            vm.residencyStartType,
            vm.currentFieldWorker,
            vm.currentIndividual,
            vm.selectedLocation,
            vm.collectionDateTime,
            res)
            .then(function(response) {
                vm.submittedResidencies.push(response.data);
                vm.individual = null;
            }, errorHandler);
    };

    vm.submitMembership = function(mem){
        mem.individual = {uuid: vm.currentIndividual.uuid};
        mem.socialGroup = {uuid: vm.selectedSocialGroups[0].uuid};
        MembershipService.submit(
            vm.currentFieldWorker,
            vm.collectionDateTime,
            mem)
            .then(function(response) {
                console.log(response.data);
                vm.submittedMemberships.push(response.data);
            }, errorHandler);
    };

    vm.submitRelationship = function(rel) {
        RelationshipService.submitOne(
            vm.currentFieldWorker,
            vm.collectionDateTime,
            rel)
            .then(function(response) {
                console.log(response.data);
                vm.submittedRelationships.push(response.data);
            }, errorHandler);
    };

    vm.submitBaseline = function(){
        vm.selectedLocation = null;
        vm.selectedSocialGroups = [];
        vm.selectedIndividuals = [];
        vm.selectedRelationships = [];

        vm.currentIndividual = null;
        vm.individual = null;
        vm.location = null;
        vm.socialGroup = null;
        vm.relationship = null;

        vm.submittedLocations = [];
        vm.submittedMemberships = [];
        vm.submittedRelationships = [];
        vm.submittedResidencies = [];

    };


    vm.init = function() {


        var codesUrl = $rootScope.restApiUrl + "/projectCodes/bulk.json";

        $http.get(codesUrl, {headers: headers})
            .then(function(response) {
                vm.codes = response.data;
            });

        FieldWorkerService.getAllFieldWorkers().then(function(fieldworkers) {
            vm.allFieldWorkers = fieldworkers;
        }, errorHandler);

        LocationHierarchyService.locationHierarchies().then(function(hierarchyTree) {
            vm.locationHierarchies = hierarchyTree;
            console.log(hierarchyTree);
            console.log('Hierarchy INIT complete');
        }, errorHandler);
        LocationHierarchyService.getLevels().then(function(response) {
            vm.allHierarchyLevels = response.data;
        }, errorHandler);

        SocialGroupService.getAllSocialGroups().then(function(groups) {
            vm.allSocialGroups = groups;
        }, errorHandler);
    };

    function errorHandler(error) {
        vm.errorMessage = error;
    }

    vm.getExtId = function(type) {
        switch(type) {
        case "Location":
            LocationService.getExtId().then(function(response) {
                if (vm.location) {
                    vm.location.extId = response.data;
                } else {
                    vm.location = {extId: response.data};
                }
            });
            break;
        case "Individual":
            IndividualService.getExtId().then(function(response) {
                if (vm.individual) {
                    vm.individual.extId = response.data;
                } else {
                    vm.individual = {extId: response.data};
                }
            });
            break;
        case "SocialGroup":
            SocialGroupService.getExtId().then(function(response) {
                if(vm.socialGroup) {
                    vm.socialGroup.extId = response.data;
                } else {
                    vm.socialGroup = {extId: response.data};
                }
            });
            break;
        }
    };

    vm.errorHandler = errorHandler;
    vm.locationHierarchies = [];


    console.log(vm.treeData);
    return vm;
};
