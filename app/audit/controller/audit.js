'use strict';


angular.module('AuditModule', [])
    .controller('AuditController',
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
            AuditController]);

function AuditController($rootScope,
                            $http,
                            LocationHierarchyService,
                            FieldWorkerService,
                            LocationService,
                            SocialGroupService,
                            IndividualService,
                            MembershipService,
                            RelationshipService,
                            ResidencyService) {


    var vm = this;
    var headers = { authorization: "Basic " + $rootScope.credentials };
    vm.selectedHierarchy = [];


    vm.currentEntity = null;

    vm.tempLoc = null;
    vm.tempIndiv = null;
    vm.tempSocial = null;

    vm.entityList = [
        {
            'name':'Location',
            'code':'location'
        },
        {
            'name':'Individual',
            'code':'individual'
        },
        {
            'name':'Household',
            'code':'socialGroup'
        }

    ];


    vm.lookupEntity = function(){
        switch(vm.entityType){
            case null:
                break;
            case 'location':
                vm.lookupLocation();
                break;
            case 'individual':
                vm.lookupIndividual();
                break;
            case 'socialGroup':
                vm.lookupSocialGroup();
                break;
            default:
                break;

        }
    };


    vm.toSubmit = {};

    vm.setTemp = function(x){
        vm[x] = angular.copy(vm.currentEntity);
    };



    vm.lookupLocation = function(){
        vm.currentEntity = null;
        LocationService.getByUuid(vm.searchUuid)
            .then(function(response) {
                vm.currentEntity = response;
                vm.setTemp("tempLoc");
                $("#editLocationModal").modal();
            });


    };

    vm.lookupIndividual = function(){
        IndividualService.getByUuid(vm.searchUuid)
            .then(function(response) {
                vm.currentEntity = response;
                vm.setTemp("tempIndiv");
                $("#editIndividualModal").modal();
            });
    };

    vm.lookupSocialGroup = function(){
        SocialGroupService.getByUuid(vm.searchUuid)
            .then(function(response) {
                vm.currentEntity = response;
                vm.setTemp("tempSocial")
                $("#editSocialGroupModal").modal();

            });
    };



    vm.saveLocation = function(){
        var temp = angular.copy(vm.tempLoc);

        vm.toSubmit = {};

        // Placeholder
        vm.toSubmit.registrationDateTime = vm.collectionDateTime;


        vm.toSubmit.location = {
            'uuid': temp.uuid,
            'entityStatus': temp.entityStatus,
            'collectedBy': temp.collectedBy,
            'collectionDateTime': temp.collectionDateTime,
            'extId': temp.extId,
            'name': temp.name,
            'type': temp.type,
            'locationHierarchy': temp.locationHierarchy
        };

        vm.toSubmit.locationHierarchyUuid  = temp.locationHierarchy.uuid

    };

    vm.saveIndividual = function(){
        var temp = angular.copy(vm.tempIndiv);

        vm.toSubmit = {};

        // Placeholder
        vm.toSubmit.registrationDateTime = vm.collectionDateTime;
        vm.toSubmit.individual = {
            'uuid': temp.uuid,
            'entityStatus': temp.entityStatus,
            'collectedBy': temp.collectedBy,
            'collectionDateTime': temp.collectionDateTime,
            'extId': temp.extId,
            'firstName': temp.firstName,
            'lastName': temp.lastName,
        };

    };

    vm.saveSocialGroup = function(){
        var temp = angular.copy(vm.tempSocial);

        vm.toSubmit = {};

        // Placeholder
        vm.toSubmit.registrationDateTime = vm.collectionDateTime;
        vm.toSubmit.socialGroup = {
            'uuid': temp.uuid,
            'extId': temp.extId,
            'collectedBy': temp.collectedBy,
            'collectionDateTime': temp.collectionDateTime,
            'groupName': temp.groupName,
            'groupType': temp.groupType
        };

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
    };

    vm.searchByHierarchy = function(){
        console.log("GO------");
        switch(vm.entityTypeBH){
            case null:
                break;
            case 'location':
                console.log("GOT HERE");
                LocationService.getByHierarchy(vm.currentHierarchy.uuid)
                    .then(function(response) {
                        vm.allLocations = response;
                        vm.locationDisplayCollection = [].concat(response);
                    });
                break;
            case 'individual':
                vm.lookupIndividual();
                break;
            case 'socialGroup':
                vm.lookupSocialGroup();
                break;
            default:
                break;

        }
    };

    vm.viewJson = function(row){
        vm.entityToView = row;
        $("#entityJsonModal").modal();
    };

    vm.editLocation = function(row){
        vm.currentEntity = row;
        vm.setTemp("tempLoc");
        $("#editLocationModal").modal();
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

        LocationHierarchyService.locationHierarchies().then(function(hierarchyTree) {
            vm.locationHierarchies = hierarchyTree;
        });
        LocationHierarchyService.getLevels().then(function(response) {
            vm.allHierarchyLevels = response.data;
        });


    };

    return vm;
}