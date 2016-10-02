angular.module('openhds')
    .controller('BaselineController',
                ['$rootScope', '$location', '$http',
                 'LocationHierarchyService', 'FieldWorkerService',
                 BaselineController]);

function initTab(id) {
    $('id').click(function (e) {
        e.preventDefault();
        $('id').tab('show');
    });
}

function RequestFactory(fieldworker, time) {
    return {
        locationRequest: function(model) {
            return {
                collectedByUuid: fieldworker,
                locationHierarchyUuid: model.currentHierarchy.uuid,
                location: {
                    name: model.location.name,
                    extId: model.location.extId,
                    type: model.location.type,
                    collectionDateTime: time
                }
            };
        },
        socialGroupRequest: function(model) {
            return {
                collectedByUuid: fieldworker,
                socialGroup: {
                    groupName: model.socialGroup.groupName,
                    extId: model.socialGroup.extId,
                    groupType: model.socialGroup.groupType,
                    collectionDateTime: time
                }
            };
        },
        individualRequest: function(model, index) {
            return {
                collectedByUuid: fieldworker,
                individual: {
                    firstName: vm.individuals[index].firstName,
                    lastName: vm.individuals[index].lastName,
                    extId: vm.individuals[index].extId,
                    gender: vm.individuals[index].gender,
                    collectionDateTime: time
                }
            };
        },
        relationshipRequest: function(model, index) {
            return {
                collectedByUuid: fieldworker,
                relationship: {
                    individualA: vm.relationships[index].individualA,
                    individualB: vm.relationships[index].individualB,
                    relationshipType: vm.relationships[index].relationshipType,
                    startDate: vm.relationships[index].startDate,
                    collectionDateTime: time
                }
            };
        },
        membershipRequest: function(model, index) {
            return {
                collectedByUuid: fieldworker,
                membership: {
                    individual: model.memberships[index].individual,
                    socialGroup: model.memberships[index].location,
                    startType: model.memberships[index].startType,
                    startDate: model.memberships[index].startDate,
                    collectionDateTime: time
                }
            };
        },
        residencyRequest: function(model, index) {
            return {
                collectedByUuid: fieldworker,
                residency: {
                    individual: model.residencies[index].individual,
                    location: model.residencies[index].location,
                    startType: model.residencies[index].startType,
                    startDate: model.residencies[index].startDate,
                    collectionDateTime: time
                }
            };
        }
    };
}

function generateRequests(model) {
    var collectedByUuid = model.currentFieldWorker.uuid,
        collectionDateTime = model.collectionDateTime,
        factory = new RequestFactory(collectedByUuid, collectionDateTime);

    return {
        locationRequest: {
            collectedByUuid: collectedByUuid,
            location: {

            }
        },
        socialGroupRequest: {},
        individualRequests: [],
        relationshipRequests: []
    };
}

function submitBaseline($http, serverUrl, headers,
                        fieldWorkerUuid, collectionDate,
                        locationRequest, socialGroupRequest,
                        individualRequests, relationshipRequests) {
    var locationUuid = "UNKNOWN",
        socialGroupUuid = "UNKNOWN",
        individualUuids = [];

    var requestHeader = {headers: headers};

    var locationPromise = $http.post(serverUrl, locationRequest, requestHeader);
    var socialGroupPromise = $http.post(serverUrl, socialGroupRequest, requestHeader);
    var individualPromises = individualRequests.map(function(individual) {
        var response = $http.post(serverUrl, individual, requestHeader);
    });
    var membershipPromises;
    var residencyPromises;
    var relationshipPromises;
}



// currentFieldWorkerUuid
// currentHierarchyUuid
// collectionDateTime

function BaselineController($rootScope, $location, $http,
                            LocationHierarchyService, FieldWorkerService) {
    var vm = this;
    var headers = {authorization: "Basic " + $rootScope.credentials};
    vm.selectedHierarchy = [];

    vm.saveFieldWorker = function() {
        var result = vm.allFieldWorkers.filter(
            function(fw) {
                return fw.uuid === vm.currentFieldWorkerUuid;
            });
        vm.currentFieldWorker = result[0];
    };

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
        initTab('#baselineTab');
        initTab('#locationTab');
        initTab('#groupTab');
        initTab('#individualsTab');
        initTab('#relationshipsTab');

        var fieldworkersUrl = $rootScope.restApiUrl + "/fieldWorkers/bulk.json";

        var codesUrl = $rootScope.restApiUrl + "/projectCodes/bulk.json";


        $http.get(codesUrl, {headers: headers})
            .then(function(response) {
                vm.codes = response.data;
            });

        FieldWorkerService.getAllFieldWorkers(function(fieldworkers) {
            vm.allFieldWorkers = fieldworkers;
        });

        LocationHierarchyService.locationHierarchies(function(hierarchyTree) {
            vm.locationHierarchies = hierarchyTree;
        });
        LocationHierarchyService.getLevels().then(function(response) {
            vm.allHierarchyLevels = response.data;
        });
    };


    function individualsSuccess(result) {
        var memberhipsUrl = $rootScope.restApiUrl + "/memberships",
            residenciesUrl = $rootScope.restApiUrl + "/residencies",
            relationshipsUrl = $rootScope.restApiUrl + "/relationships";
    }

    function groupSuccess(result) {
        var individualsUrl = $rootScope.restApiUrl + "/individuals";

    }

    function locationSuccess(result) {
        var socialGroupsUrl = $rootScope.restApiUrl + "/socialGroups";
    }

    vm.submitVisit = function() {
        var locationsUrl = $rootScope.restApiUrl + "/locations";
        var locationsBody = {
            "collectedByUuid": vm.currentFieldWorker.uuid,
            "locationHierarchyUuid": vm.selectedHierarchy[vm.selectedHierarchy.length - 1],
            "location": {
                "collectionDateTime": vm.collectionDateTime,
                "extId": vm.location.extId,
                "name": vm.location.name,
                "type": vm.location.type // TODO: lat, long, alt and accuracy
            }
        };
        $http.post(locationsUrl, locationsBody, {headers: headers}).then(locationSuccess, function(result) {
            //todo: set error message here
        });

        // submit group
        // submit individuals
        // submit memberships
        // submit residencies
        // submit relationships
    }

    return vm;
}
