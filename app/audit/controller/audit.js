'use strict';


angular.module('AuditModule', ['ui.tree'])
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

    vm.saveLocationHierarchy = function(hierarchy) {
        vm.searchHierarchy = {
            uuid: hierarchy.id,
            extId: hierarchy.title
        };
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
                VisitService.getByVisitDate(vm.currentSearch.visitDate)
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



    // ----------------------- Related entities -----

    vm.related = {

        socialGroup : {
          individuals : {},
          memberships :{}
        },
        location : {
            individuals :{},
            visits :{}
        },
        individual :{
            memberships : {},
            relationships : {},
            residencies : {},
            events :{}
        },
        visit : {
            events :{}
        }
    };

    vm.viewRelated = function(type, row){
        vm.currentEntity = row;

        // close any open tables from previous searches
        var objList = Object.keys(vm.related[type]);
        for(var i = 0; i < objList.length; i++){
            vm.related[type][objList[i]].show = false;
        }

        switch(type){
            case "socialGroup":
                $("#relatedSocialGroupModal").modal();
                break;
            case "individual":
                $("#relatedIndividualModal").modal();
                break;
            case "location":
                $("#relatedLocationModal").modal();
                break;
            case "visit":
                $("#relatedVisitModal").modal();
                break;
            default:
                break;
        }
    };

    vm.toggleSocialGroupRelated = function(type){
        if (!vm.related['socialGroup'][type].show){
             vm.related['socialGroup'][type].loadMsg = true;

            switch(type){
                case "individuals":
                    IndividualService.getBySocialGroup(vm.currentEntity.uuid)
                        .then(function(response) {
                            vm.related['socialGroup'].individuals.data = response;
                            vm.related['socialGroup'].individuals.displayCollection = [].concat(response);
                            vm.related['socialGroup'].individuals.loadMsg = false;
                        }, errorHandler);
                    break;
                case "memberships":
                    MembershipService.getMembershipsBySocialGroup(vm.currentEntity.uuid)
                        .then(function(response) {
                            vm.related['socialGroup'].memberships.data = response;
                            vm.related['socialGroup'].memberships.displayCollection = [].concat(response);
                            vm.related['socialGroup'].memberships.loadMsg = false;
                        }, errorHandler);
                    break;
                default:
                    break;
            }
        }
        vm.related['socialGroup'][type].show = !vm.related['socialGroup'][type].show;
        console.log(type);
    };


    vm.toggleIndividualRelated = function(type){
        if (!vm.related['individual'][type].show){
            vm.related['individual'][type].loadMsg = true;

            switch(type){
                case "memberships":
                    MembershipService.getMembershipsByIndividual(vm.currentEntity.uuid)
                        .then(function(response) {
                            vm.related['individual'].memberships.data = response;
                            vm.related['individual'].memberships.displayCollection = [].concat(response);
                            vm.related['individual'].memberships.loadMsg = false;
                        }, errorHandler);
                    break;
                case "relationships":
                    RelationshipService.getRelationshipsByIndividual(vm.currentEntity.uuid)
                        .then(function(response) {
                            vm.related['individual'].relationships.data = response;
                            vm.related['individual'].relationships.displayCollection = [].concat(response);
                            vm.related['individual'].relationships.loadMsg = false;
                        }, errorHandler);
                    break;
                case "residencies":
                    ResidencyService.getResidenciesByIndividual(vm.currentEntity.uuid)
                        .then(function(response) {
                            vm.related['individual'].residencies.data = response;
                            vm.related['individual'].residencies.displayCollection = [].concat(response);
                            vm.related['individual'].residencies.loadMsg = false;
                        }, errorHandler);
                    break;
                case "events":
                    VisitEventService.getEventsByIndividual(vm.currentEntity.uuid)
                        .then(function(response) {
                            vm.related['individual'].events.data = response;
                            vm.related['individual'].events.displayCollection = [].concat(response);
                            vm.related['individual'].events.loadMsg = false;
                        }, errorHandler);
                    break;
                default:
                    break;
            }
        }
        vm.related['individual'][type].show = !vm.related['individual'][type].show;
        console.log(type);
    };


    vm.toggleLocationRelated = function(type){
        if (!vm.related['location'][type].show){
            vm.related['location'][type].loadMsg = true;

            switch(type){
                case "individuals":
                    IndividualService.getByLocation(vm.currentEntity.uuid)
                        .then(function(response) {
                            vm.related['location'].individuals.data = response;
                            vm.related['location'].individuals.displayCollection = [].concat(response);
                            vm.related['location'].individuals.loadMsg = false;
                        }, errorHandler);
                    break;
                case "visits":
                    VisitService.getByLocation(vm.currentEntity.uuid)
                        .then(function(response) {
                            vm.related['location'].visits.data = response;
                            vm.related['location'].visits.displayCollection = [].concat(response);
                            vm.related['location'].visits.loadMsg = false;
                        }, errorHandler);
                    break;
                default:
                    break;
            }
        }
        vm.related['location'][type].show = !vm.related['location'][type].show;
        console.log(type);
    };


    vm.toggleVisitRelated = function(type){
        if (!vm.related['visit'][type].show){
            vm.related['visit'][type].loadMsg = true;

            switch(type){
                case "events":
                    VisitEventService.getEventsByVisit(vm.currentEntity.uuid)
                        .then(function(response) {
                            vm.related['visit'].events.data = response;
                            vm.related['visit'].events.displayCollection = [].concat(response);
                            vm.related['visit'].events.loadMsg = false;
                        }, errorHandler);
                    break;
                default:
                    break;
            }
        }
        vm.related['visit'][type].show = !vm.related['visit'][type].show;
        console.log(type);
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
