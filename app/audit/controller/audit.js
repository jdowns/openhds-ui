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

    vm.temp = {
        name: 'a thing'
    };

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




    vm.searchLocation = function(){
        LocationService.getByUuid(vm.searchUuid)
            .then(function(response) {
                vm.currentEntity = response;
            });
    };

    vm.searchIndividual = function(){
        IndividualService.getByUuid(vm.searchUuid)
            .then(function(response) {
                vm.currentEntity = response;
            });
    };

    vm.searchSocialGroup = function(){
        SocialGroupService.getByUuid(vm.searchUuid)
            .then(function(response) {
                vm.currentEntity = response;
            });
    };




    $(document).ready (function(){
        $("#success-alert").hide();
    });



    vm.init = function() {
        $("#success-alert").hide();


        var codesUrl = $rootScope.restApiUrl + "/projectCodes/bulk.json";

        $http.get(codesUrl, {headers: headers})
            .then(function(response) {
                vm.codes = response.data;
            });

    };

    return vm;
}