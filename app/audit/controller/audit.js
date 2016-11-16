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
            'MembershipService',
            'RelationshipService',
            'ResidencyService',
            'VisitEventService',
            AuditController]);

function AuditController($rootScope,
                            $http,
                            LocationHierarchyService,
                            FieldWorkerService,
                            LocationService,
                            SocialGroupService,
                            VisitService,
                            IndividualService,
                            MembershipService,
                            RelationshipService,
                            ResidencyService,
                            VisitEventService) {

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
            }, errorHandler);
    };

    vm.lookupIndividual = function(){
        IndividualService.getByExtId(vm.searchExtId)
            .then(function(response) {
                vm.currentEntity = response;
                vm.queryResult.data = response;
                vm.queryResult.displayCollection = [].concat(response);
            }, errorHandler);
    };

    vm.lookupSocialGroup = function(){
        SocialGroupService.getByExtId(vm.searchExtId)
            .then(function(response) {
                vm.currentEntity = response;
                vm.queryResult.data = response;
                vm.queryResult.displayCollection = [].concat(response);
            }, errorHandler);
    };

    vm.lookupVisit = function(){
        VisitService.getVisitByExtId(vm.searchExtId)
            .then(function(response) {
                vm.currentEntity = response;
                vm.queryResult.data = response;
                vm.queryResult.displayCollection = [].concat(response);
            }, errorHandler);
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
        vm.searchHierarchy = children.filter(function(child) {
            return child.uuid === last;
        })[0];
    };

    vm.searchByHierarchy = function(){
        vm.queryResult.entityType = vm.entityType;
        switch(vm.entityType){
            case null:
                break;
            case 'location':
                LocationService.getByHierarchy(vm.searchHierarchy.uuid)
                    .then(function(response) {
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    }, errorHandler);
                break;
            case 'individual':
                IndividualService.getByHierarchy(vm.searchHierarchy.uuid)
                    .then(function(response) {
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    }, errorHandler);
                break;
            case 'visit':
                VisitService.getByHierarchy(vm.searchHierarchy.uuid)
                    .then(function(response) {
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    }, errorHandler);
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
                    }, errorHandler);
                break;
            case 'location':
                LocationService.getByFieldWorker(vm.currentFieldWorker.id)
                    .then(function(response) {
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    }, errorHandler);
                break;
            case 'socialGroup':
                SocialGroupService.getByFieldWorker(vm.currentFieldWorker.id)
                    .then(function(response) {
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    }, errorHandler);
                break;
            case 'visit':
                VisitService.getByFieldWorker(vm.currentFieldWorker.id)
                    .then(function(response) {
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    }, errorHandler);
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
                    }, errorHandler);
                break;
            case 'individual':
                IndividualService.getBySearch(tmp)
                    .then(function(response){
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    }, errorHandler);
                break;
            case 'socialGroup':
                SocialGroupService.getBySearch(tmp)
                    .then(function(response){
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    }, errorHandler);
                break;
            case 'visit':
                VisitService.getBySearch(tmp)
                    .then(function(response){
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    }, errorHandler);
                break;
            case 'fieldWorker':
                FieldWorkerService.getBySearch(tmp)
                    .then(function(response){
                        vm.queryResult.data = response;
                        vm.queryResult.displayCollection = [].concat(response);
                    }, errorHandler);
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

    vm.individualRelated = {
        memberships : {
            show: false,
            data: [],
            displayCollection: [],
            loadMsg :false
        },
        relationships : {
            show: false,
            data: [],
            displayCollection: [],
            loadMsg :false
        },
        residencies : {
            show: false,
            data: [],
            displayCollection: [],
            loadMsg :false
        },
        events :{
            show: false,
            data: [],
            displayCollection: [],
            loadMsg :false
        }
    };

    vm.toggleIndividualRelated = function(type){
        if (!vm.individualRelated[type].show){
            vm.individualRelated[type].loadMsg = true;

            switch(type){
                case "memberships":
                    vm.getMembershipsByIndividual();
                    break;
                case "relationships":
                    vm.getRelationshipsByIndividual();
                    break;
                case "residencies":
                    vm.getResidenciesByIndividual();
                    break;
                case "events":
                    vm.getEventsByIndividual();
                    break;
                default:
                    break;
            }
        }
        vm.individualRelated[type].show = !vm.individualRelated[type].show;
        console.log(type);
    };


    // -----------------

    vm.viewRelatedVisit= function(row){
        vm.currentEntity = row;
        $("#relatedVisitModal").modal();

    };
    vm.visitRelated = {
        events :{
            show: false,
            data: [],
            displayCollection: [],
            loadMsg :false
        }
    };

    vm.toggleVisitRelated = function(type){
        if (!vm.visitRelated[type].show){
            vm.visitRelated[type].loadMsg = true;

            switch(type){
                case "events":
                    vm.getEventsByVisit();
                    break;
                default:
                    break;
            }
        }
        vm.visitRelated[type].show = !vm.visitRelated[type].show;
        console.log(type);
    };




    vm.getMembershipsByIndividual = function(){
        MembershipService.getMembershipsByIndividual(vm.currentEntity.uuid)
            .then(function(response) {
                vm.individualRelated.memberships.data = response;
                vm.individualRelated.memberships.displayCollection = [].concat(response);
                vm.individualRelated.memberships.loadMsg = false;
            }, errorHandler);
    };

    vm.getRelationshipsByIndividual = function(){
        RelationshipService.getRelationshipsByIndividual(vm.currentEntity.uuid)
            .then(function(response) {
                vm.individualRelated.relationships.data = response;
                vm.individualRelated.relationships.displayCollection = [].concat(response);
                vm.individualRelated.relationships.loadMsg = false;
            }, errorHandler);
    };

    vm.getResidenciesByIndividual = function(){
        ResidencyService.getResidenciesByIndividual(vm.currentEntity.uuid)
            .then(function(response) {
                vm.individualRelated.residencies.data = response;
                vm.individualRelated.residencies.displayCollection = [].concat(response);
                vm.individualRelated.residencies.loadMsg = false;
            }, errorHandler);
    };

    vm.getEventsByIndividual = function(){
        VisitEventService.getEventsByIndividual(vm.currentEntity.uuid)
            .then(function(response) {
                vm.individualRelated.events.data = response;
                vm.individualRelated.events.displayCollection = [].concat(response);
                vm.individualRelated.events.loadMsg = false;
            }, errorHandler);
    };

    vm.getEventsByVisit = function(){
        VisitEventService.getEventsByVisit(vm.currentEntity.uuid)
            .then(function(response) {
                vm.visitRelated.events.data = response;
                vm.visitRelated.events.displayCollection = [].concat(response);
                vm.visitRelated.events.loadMsg = false;
            }, errorHandler);
    };

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
