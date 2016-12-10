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
    var deleteMembershipsMsg = "You must delete memberships first.";
    var deleteRelationshipMsg = "You must delete relationships first.";
    var deleteResidencyMsg = "You must delete residencies first.";
    var deleteVisitMsg = "You must delete visits first.";

    vm.selectedHierarchy = [];
    vm.currentEntity = null;
    vm.tempLoc = null;
    vm.tempIndiv = null;
    vm.tempSocial = null;
    vm.tempInMig = null;
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
                console.log(response);
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

        vm.toSubmit.locationHierarchyUuid  = temp.locationHierarchy.uuid;
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

    vm.saveSocialGroup = function() {
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

    vm.edit = function(row, type){
        vm.currentEntity = row;
        switch(type){
            case 'location':
                vm.setTemp("tempLoc");
                $("#editLocationModal").modal();
                break;
            case 'individual':
                vm.setTemp("tempIndiv");
                $("#editIndividualModal").modal();
                break;
            case 'socialGroup':
                vm.setTemp("tempSocial");
                $("#editSocialGroupModal").modal();
                break;
            case 'inMigration':
                vm.setTemp("tempInMig");
                $("#editInMigrationModal").modal();
                break;
            case 'outMigration':
                vm.setTemp("tempOutMig");
                $("#editOutMigrationModal").modal();
                break;
            case 'death':
                vm.setTemp("tempDeath");
                $("#editDeathModal").modal();
                break;
            default:
                break;
        }

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

    function deleteVisit(row) {
        VisitService.getByAfterDate(row.visitDate)
            .then(function(response) {
                var visitsAtLocation = response.filter(function(visit) {
                    return visit.location.uuid === row.location.uuid;
                });
                if(visitsAtLocation.length > 0) {
                    vm.errorMessage = {
                        statusText: "Unable to delete visit. There are later visits at this location that must be deleted first."};
                } else {
                    VisitEventService.getEventsByVisit(vm.currentEntity.uuid)
                        .then(function(response) {
                            if (response.length === 0) {
                                VisitService.delete(row.uuid);
                            } else {
                                vm.errorMessage = {
                                    statusText: "Unable to delete visit. It has events that must be deleted first"
                                };
                            }
                        });
                }});
    }

    function deleteRelationship(row) {
        console.log("deleting relationship " + row.uuid);
        RelationshipService.delete(row.uuid);
    }

    function deleteMembership(row) {
        console.log("deleting membership " + row.uuid);
        MembershipService.delete(row.uuid);
    }

    function deleteResidency(row) {
        console.log("deleting residency " + row.uuid);
        ResidencyService.delete(row.uuid);
    }

    function checkForDependents(response, msg) {
        if (response.length > 0) {
            vm.errorMessage = {statusText: msg};
            return true;
        }
        return false;
    }

    function deleteIndividual(row) {
        var uuid = row.uuid;

        function handleVisitEventResponse(response) {
            if(!checkForDependents(response, deleteVisitMsg)) {
                IndividualService.delete(uuid, "audit");
            }
        }

        function handleResidencyResponse(response) {
            if(!checkForDependents(response, deleteResidencyMsg)) {
                VisitEventService.getEventsByIndividual(uuid)
                    .then(handleVisitEventResponse);
            }
        }

        function handleRelationshipResponse(response) {
            if (!checkForDependents(response, deleteRelationshipMsg)) {
                ResidencyService.getResidenciesByIndividual(uuid)
                    .then(handleResidencyResponse);
            }
        }

        function handleMembershipResponse(response) {
            if(!checkForDependents(response, deleteMembershipsMsg)) {
                RelationshipService.getRelationshipsByIndividual(uuid)
                    .then(handleRelationshipResponse);
            }
        }

        MembershipService.getMembershipsByIndividual(uuid)
            .then(handleMembershipResponse);
    }

    function deleteSocialGroup(row) {
        var uuid = row.uuid;
        MembershipService.getMembershipsBySocialGroup(uuid)
            .then(function(response) {
                if(!checkForDependents(response, deleteMembershipsMsg)) {
                    SocialGroupService.delete(uuid, "audit");
                }
            });
    }

    function deleteLocation(row) {
        var uuid = row.uuid;

        IndividualService.getByLocation(uuid)
            .then(function(response) {
                if(!checkForDependents(response, deleteResidencyMsg)) {
                    VisitService.getByLocation(uuid)
                        .then(function(response) {
                            if(!checkForDependents(response, deleteVisitMsg)) {
                                LocationService.delete(uuid, "audit");
                            }
                        });
                }
            });
    }

    vm.deleteEntity = function(row, type) {
        var id = row.uuid;
        var entityType = type || vm.entityType;

        switch(entityType) {
        case "visit":
            deleteVisit(row);
            break;
        case "inMigration":
        case "outMigration":
        case "death":
        case "pregnancyObservation":
        case "pregnancyOutcome":
        case "pregnancyResult":
            var visit = vm.currentEntity;
            VisitService.getByAfterDate(visit.visitDate)
                .then(function(response) {
                    var visitsAtLocation = response.filter(function(v) {
                        console.log('v');
                        console.log(v);
                        return v.location.uuid === visit.location.uuid;
                    });
                    if(visitsAtLocation.length > 0) {
                        vm.errorMessage = {
                            statusText: "Unable to delete event. There are later visits at this location that must be deleted first."
                        };
                    } else {
                        VisitEventService.deleteEntity(row.uuid, entityType);
                    }
                });
            break;
        case "individual":
            deleteIndividual(row);
            break;
        case "socialGroup":
            deleteSocialGroup(row);
            break;
        case "location":
            deleteLocation(row);
            break;
        case "relationship":
            deleteRelationship(row);
            break;
        case "membership":
            deleteMembership(row);
            break;
        case "residency":
            deleteResidency(row);
            break;
        }
    };

    vm.submitEdited = function(type){
        var temp;
        var res;

        switch(type){
            case "location":
                temp = angular.copy(vm.tempLoc);
                res = LocationService.submitEdited(temp);
                console.log(res);
                break;
            case "individual":
                temp = angular.copy(vm.tempIndiv);
                res = IndividualService.submitEdited(temp);
                console.log(res);
                break;
            case "socialGroup":
                temp = angular.copy(vm.tempSocial);
                res = SocialGroupService.submitEdited(temp);
                console.log(res);
                break;
            case "inMigration":
                temp = angular.copy(vm.tempInMig);
                res = VisitEventService.submitEdited(temp, 'inMigration');
                console.log(res);
                break;
            case "outMigration":
                temp = angular.copy(vm.tempOutMig);
                res = VisitEventService.submitEdited(temp, 'outMigration');
                console.log(res);
                break;
            case "death":
                temp = angular.copy(vm.tempDeath);
                res = VisitEventService.submitEdited(temp, 'death');
                console.log(res);
                break;
        }


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
        //console.log(error);
        console.log("inside error handler");
        vm.errorMessage = error;
    }

    vm.errorHandler = errorHandler;

    return vm;
}
