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

    vm.currentEntity = null;

    vm.tempLoc = null;
    vm.tempIndiv = null;

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


    vm.searchEntity = function(){
        switch(vm.entityType){
            case null:
                break;
            case 'location':
                vm.searchLocation();
                break;
            case 'individual':
                vm.searchIndividual();
                break;
            case 'socialGroup':
                vm.searchSocialGroup();
                break;
            default:
                break;

        }
    };


    vm.toSubmit = {};

    vm.setTemp = function(x){
        vm[x] = angular.copy(vm.currentEntity);
    };



    vm.searchLocation = function(){
        vm.currentEntity = null;
        LocationService.getByUuid(vm.searchUuid)
            .then(function(response) {
                vm.currentEntity = response;
                vm.setTemp("tempLoc");
                $("#editLocationModal").modal();
            });


    };

    vm.searchIndividual = function(){
        IndividualService.getByUuid(vm.searchUuid)
            .then(function(response) {
                vm.currentEntity = response;
                vm.setTemp("tempIndiv");
                $("#editIndividualModal").modal();
            });
    };

    vm.searchSocialGroup = function(){
        SocialGroupService.getByUuid(vm.searchUuid)
            .then(function(response) {
                vm.currentEntity = response;
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
            'locationHierarchy': temp.locationHierarchy
        };

    };


    vm.init = function() {


        var codesUrl = $rootScope.restApiUrl + "/projectCodes/bulk.json";

        $http.get(codesUrl, {headers: headers})
            .then(function(response) {
                vm.codes = response.data;
            });

    };

    return vm;
}