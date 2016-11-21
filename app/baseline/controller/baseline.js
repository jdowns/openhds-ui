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
            }, errorHandler);

        IndividualService.getByHierarchy(vm.currentHierarchy.uuid)
            .then(function(response) {
                console.log(response);
                vm.allIndividuals = response;
                vm.individualDisplayCollection = [].concat(response);
            }, errorHandler);

        ResidencyService.getByHierarchy(vm.currentHierarchy.uuid)
            .then(function(response) {
                console.log(response);
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
        LocationService.submit(vm.currentFieldWorker,
                               vm.collectionDateTime,
                               vm.currentHierarchy,
                               location)
            .then(function(response) {
                console.log(response.data);
                vm.submittedLocations.push(response.data);
                vm.selectedLocation = response.data;
                vm.location = {};
            }, errorHandler);
    };

    vm.submitSocialGroup = function(sg) {
        SocialGroupService.submit(vm.currentFieldWorker,
                                  vm.collectionDateTime,
                                  sg)
            .then(function(response) {
                console.log(response.data);
                vm.selectedSocialGroups.push(response.data);
                vm.socialGroup = {};
            }, errorHandler);
    };

    vm.submitIndividual = function(indiv){
        IndividualService.submit(vm.currentFieldWorker,
                                 vm.collectionDateTime,
                                 indiv)
            .then(function(response) {
                console.log(response.data);
                vm.currentIndividual = response.data;
            }, errorHandler);
    };

    vm.submitResidency = function(res) {
        ResidencyService.submit(
            vm.residencyStartType,
            vm.currentFieldWorker,
            vm.individual,
            vm.selectedLocation,
            vm.collectionDateTime,
            res)
            .then(function(response) {
                console.log(response.data);
                vm.submittedResidencies.push(response.data);
            }, errorHandler);
    };

    vm.submitMembership = function(mem){
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

    vm.errorHandler = errorHandler;

    return vm;
};
