angular.module('openhds')
    .controller('BaselineController',
                ['$rootScope', '$location', '$http',
                 'LocationHierarchyService', 'FieldWorkerService',
                 'LocationService', 'SocialGroupService',
                 'IndividualService', 'RelationshipService',
                 'MembershipService', 'ResidencyService',
                 BaselineController]);

function initTab(id) {
    $('id').click(function (e) {
        e.preventDefault();
        $('id').tab('show');
    });
}

function BaselineController($rootScope, $location, $http,
                            LocationHierarchyService,
                            FieldWorkerService,
                            LocationService,
                            SocialGroupService,
                            IndividualService,
                            RelationshipService,
                            MembershipService,
                            ResidencyService) {
    var vm = this;
    vm.services = {
        locationHierarchy: LocationHierarchyService,
        fieldWorker: FieldWorkerService,
        location: LocationService,
        socialGroup: SocialGroupService,
        individual: IndividualService,
        relationship: RelationshipService,
        membership: MembershipService,
        residency: ResidencyService
    };

    vm.selectedHierarchy = [];
    vm.selectedSocialGroups = []
    vm.displayCollection = [].concat(vm.allSocialGroups);

    vm.saveFieldWorker = function() {
        var result = vm.allFieldWorkers.filter(
            function(fw) {
                return fw.uuid === vm.currentFieldWorkerUuid;
            });
        vm.currentFieldWorker = result[0];
    };

    vm.removeSelectedSocialGroup = function removeItem(row) {
        var index = vm.selectedSocialGroups.indexOf(row);
        if (index !== -1) {
            vm.selectedSocialGroups.splice(index, 1);
        }
    }

    vm.addToSocialGroups = vm.selectedSocialGroups.push;

    vm.saveLocationHierarchy = function() {
        var parentIndex = vm.selectedHierarchy.length - 2;
        var lastIndex = vm.selectedHierarchy.length - 1;

        var parent = vm.selectedHierarchy[parentIndex];
        var last = vm.selectedHierarchy[lastIndex];
        var children = vm.locationHierarchies[parent];
        vm.currentHierarchy = children.find(function(child) {
            return child.uuid === last;
        });
    };

    vm.availableHierarchies = function() {
        var result = [];

        vm.selectedHierarchy.forEach(function(h) {
            result.push(vm.locationHierarchies[h]);
        });
        return result;
    };

    vm.init = function() {
        var tabIds = ['#baselineTab', '#locationTab',
                      '#groupTab', '#individualsTab',
                      '#relationshipsTab'];

        tabIds.map(initTab);

        var socialGroupUrl = $rootScope.restApiUrl + "/socialGroups/bulk.json";

        var codesUrl = $rootScope.restApiUrl + "/projectCodes/bulk.json";

        $http.get(codesUrl, {headers: headers}) .then(function(response) {vm.codes = response.data;});

        FieldWorkerService.getAllFieldWorkers(function(fieldworkers) {
            vm.allFieldWorkers = fieldworkers;
        });

        LocationHierarchyService.locationHierarchies(function(hierarchyTree) {
            vm.locationHierarchies = hierarchyTree;
        });
        LocationHierarchyService.getLevels().then(function(response) {
            vm.allHierarchyLevels = response.data;
        });
         $http.get(socialGroupUrl, {headers: headers})
            .then(function(response) {
                vm.allSocialGroups = response.data.map(function(sg) {
                    return {
                        uuid: sg.uuid,
                        extId: sg.extId,
                        groupName: sg.groupName,
                        groupType: sg.groupType};
                });
            });
    };

    return vm;
}
