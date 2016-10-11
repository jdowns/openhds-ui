'use strict';
function initTab(id) {
    $('id').click(function (e) {
        e.preventDefault();
        $('id').tab('show');
    });
}

angular.module('BaselineModule', [])
    .controller('BaselineController',
                ['$rootScope',
                 '$http',
                 'LocationHierarchyService',
                 'FieldWorkerService',
                 'LocationService',
                 'SocialGroupService',
                    'IndividualService',
                    'MembershipService',
                 BaselineController]);

function BaselineController($rootScope,
                            $http,
                            LocationHierarchyService,
                            FieldWorkerService,
                            LocationService,
                            SocialGroupService,
                            IndividualService,
                            MembershipService)
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


    vm.setFieldWorker = function(fw){
        vm.currentFieldWorker = fw;
    };

    vm.submittedLocations = [];
    vm.submittedMemberships = [];




    //remove to the real data holder
    vm.removeSelectedEntity = function removeItem(key, row) {
        var index = vm[key].indexOf(row);
        if (index !== -1) {
            vm[key].splice(index, 1);
        }
    };

    vm.saveFieldWorker = function() {
        var result = vm.allFieldWorkers.filter(
            function(fw) {
                return fw.uuid === vm.currentFieldWorkerUuid;
            });
        vm.currentFieldWorker = result[0];
    };

    vm.setLocation = function(row) {
        vm.selectedLocation = row;
    };

    vm.setCurrentIndividual = function(row) {
        vm.currentIndividual = row;
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
            });
    };

    vm.submitSocialGroup = function(sg){
        SocialGroupService.submit(vm.currentFieldWorker,
                                  vm.collectionDateTime,
                                  sg)
            .then(function(response) {
                console.log(response.data);
                vm.selectedSocialGroups.push(response.data);
            });
    };

    vm.submitIndividual = function(indiv){
        IndividualService.submit(vm.currentFieldWorker,
                                 vm.collectionDateTime,
                                 indiv)
            .then(function(response) {
                console.log(response.data);
                vm.currentIndividual= response.data;
            });
    };

    vm.submitMembership = function(mem){
        MembershipService.submit(
            vm.currentFieldWorker,
            vm.collectionDateTime,
            mem)
            .then(function(response) {
                console.log(response.data);
                vm.submittedMemberships.push(response.data);
            });
    };

    vm.init = function() {
        var tabIds = ['#baselineTab', '#locationTab',
                      '#groupTab', '#individualsTab',
                      '#relationshipsTab'];

        tabIds.map(initTab);
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

        SocialGroupService.getAllSocialGroups().then(function(groups) {
            vm.allSocialGroups = groups;
        });
    };

    return vm;
};
