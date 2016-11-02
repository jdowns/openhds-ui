'use strict';


angular.module('AuditModule', [])
    .controller('AuditController',
        ['$rootScope',
            '$http',
            'LocationHierarchyService',
            'FieldWorkerService',
            'LocationService',
            'SocialGroupService',
            'VisitService',
            'IndividualService',
            AuditController]);

function AuditController($rootScope,
                            $http,
                            LocationHierarchyService,
                            FieldWorkerService,
                            LocationService,
                            SocialGroupService,
                            VisitService,
                            IndividualService) {


    var vm = this;
    var headers = { authorization: "Basic " + $rootScope.credentials };
    vm.selectedHierarchy = [];


    vm.currentEntity = null;

    vm.tempLoc = null;
    vm.tempIndiv = null;
    vm.tempSocial = null;
    vm.toSubmit = {};


    vm.queryResult = {
        entityType : null,
        data : [],
        displayCollection : []
    };

    vm.clearResults = function(){
        vm.queryResult.entityType = null;
        vm.queryResult.data = [];
        vm.queryResult.displayCollection = [];
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
            'name':'Social Group',
            'code':'socialGroup'
        },
        {
            'name':'Visit',
            'code':'visit'
        },
        {
            'name':'Field Worker',
            'code':'fieldWorker'
        }

    ];



    vm.lookupEntity = function(){
        vm.toSubmit = {};
        vm.queryResult.entityType = vm.entityType;
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
            case 'visit':
                vm.lookupVisit();
                break;

            default:
                break;

        }
    };

    vm.setTemp = function(x){
        vm[x] = angular.copy(vm.currentEntity);
    };

    vm.lookupLocation = function(){
        vm.currentEntity = null;
        LocationService.getByExtId(vm.searchExtId)
            .then(function(response) {
                vm.currentEntity = response;
                vm.queryResult.data = response;
                vm.queryResult.displayCollection = [].concat(response);
            });
    };

    vm.lookupIndividual = function(){
        IndividualService.getByExtId(vm.searchExtId)
            .then(function(response) {
                vm.currentEntity = response;
                vm.queryResult.data = response;
                vm.queryResult.displayCollection = [].concat(response);
            });
    };

    vm.lookupSocialGroup = function(){
        SocialGroupService.getByExtId(vm.searchExtId)
            .then(function(response) {
                vm.currentEntity = response;
                vm.queryResult.data = response;
                vm.queryResult.displayCollection = [].concat(response);
            });
    };

    vm.lookupVisit = function(){
        VisitService.getByExtId(vm.searchExtId)
            .then(function(response) {
                vm.currentEntity = response;
                vm.queryResult.data = response;
                vm.queryResult.displayCollection = [].concat(response);
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
            'description': temp.description
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
            'lastName': temp.lastName
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
        vm.queryResult.entityType = vm.entityType;
        switch(vm.entityType){
            case null:
                break;
            case 'location':
                LocationService.getByHierarchy(vm.currentHierarchy.uuid)
                    .then(function(response) {
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    });
                break;
            case 'individual':
                IndividualService.getByHierarchy(vm.currentHierarchy.uuid)
                    .then(function(response) {
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    });
                break;
            case 'visit':
                VisitService.getByHierarchy(vm.currentHierarchy.uuid)
                    .then(function(response) {
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    });
                break;

            default:
                break;

        }
    };


    vm.searchByFieldWorker = function(){
        vm.queryResult.entityType = vm.entityType;
        switch(vm.entityType){
            case null:
                break;
            case 'individual':
                IndividualService.getByFieldWorker(vm.currentFieldWorker.id)
                    .then(function(response) {
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    });
                break;
            case 'location':
                LocationService.getByFieldWorker(vm.currentFieldWorker.id)
                    .then(function(response) {
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    });
                break;

            case 'socialGroup':
                SocialGroupService.getByFieldWorker(vm.currentFieldWorker.id)
                    .then(function(response) {
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    });
                break;
            case 'visit':
                VisitService.getByFieldWorker(vm.currentFieldWorker.id)
                    .then(function(response) {
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    });
                break;


            default:
                break;

        }
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
        console.log(tmp);

        vm.queryResult.entityType = vm.entityType;

        switch(vm.entityType){
            case null:
                break;
            case 'location':
                LocationService.getBySearch(tmp)
                    .then(function(response){
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    });
                break;
            case 'individual':
                IndividualService.getBySearch(tmp)
                    .then(function(response){
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    });
                break;
            case 'socialGroup':
                SocialGroupService.getBySearch(tmp)
                    .then(function(response){
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    });
                break;
            case 'visit':
                VisitService.getBySearch(tmp)
                    .then(function(response){
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    });
                break;
            case 'fieldWorker':
                FieldWorkerService.getBySearch(tmp)
                    .then(function(response){
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    });
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

    vm.editIndividual = function(row){
        vm.currentEntity = row;
        vm.setTemp("tempIndiv");
        $("#editIndividualModal").modal();
    };


    vm.editSocialGroup = function(row){
        vm.currentEntity = row;
        vm.setTemp("tempSocial");
        $("#editSocialGroupModal").modal();
    };



    vm.availableHierarchies = function() {
        var result = [];

        vm.selectedHierarchy.forEach(function(h) {
            result.push(vm.locationHierarchies[h]);
        });
        return result;
    };

    vm.viewRelatedIndividual = function(row){
        vm.currentEntity = row;
        $("#relatedIndividualModal").modal();

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
