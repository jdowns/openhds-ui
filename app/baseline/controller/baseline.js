angular.module('openhds')
    .controller('BaselineController',
                ['$rootScope', '$location', '$http', BaselineController]);

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

function BaselineController($rootScope, $location, $http) {
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
        var result = vm.allHierarchies.filter(
            function(h) {
                return h.uuid = vm.currentHierarchyUuid;
            });
        vm.currentHierarchy = result[0];
    };

    vm.init = function() {
        initTab('#baselineTab');
        initTab('#locationTab');
        initTab('#groupTab');
        initTab('#individualsTab');
        initTab('#relationshipsTab');

        var fieldworkersUrl = $rootScope.restApiUrl +
                "/fieldWorkers/bulk.json";

        var locationHierarchyLevelsUrl = $rootScope.restApiUrl +
                "/locationHierarchyLevels/bulk.json";

        var locationHierarchiesUrl = $rootScope.restApiUrl +
                "/locationHierarchies/bulk.json";

        var codesUrl = $rootScope.restApiUrl +
                "/projectCodes/bulk.json";

        $http.get(codesUrl, {headers: headers})
            .then(function(response) {
                vm.codes = response.data;
            });

        $http.get(fieldworkersUrl, {headers: headers})
            .then(function(response) {
                vm.allFieldWorkers = response.data.map(function(fw) {
                    return {uuid: fw.uuid,
                            id: fw.fieldWorkerId,
                            firstName: fw.firstName,
                            lastName: fw.lastName};
                });
            });

        $http.get(locationHierarchyLevelsUrl, {headers: headers})
            .then(function(response) {
                vm.allHierarchyLevels = response.data.map(function(l) {
                    return {
                        uuid: l.uuid,
                        name: l.name,
                        keyIdentifier: l.keyIdentifier
                    };
                });
                $http.get(locationHierarchiesUrl, {headers: headers})
                    .then(function(response) {
                        vm.allHierarchies = response.data.map(function(h) {
                            //todo: filter these for select box
                            return {uuid: h.uuid,
                                    extId: h.extId,
                                    name: h.name,
                                    parent: h.parent ? h.parent.uuid : null,
                                    level: vm.allHierarchyLevels.find(function(level) {
                                        return h.level.uuid === level.uuid;
                                    }).keyIdentifier
                                   };
                        });
                    });
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
        console.log('success');
        console.log(result.data);
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
        console.log(locationsBody);
        console.log(headers);
        $http.post(locationsUrl, locationsBody, {headers: headers}).then(locationSuccess, function(result) {
            //todo: set error message here
            console.log('error');
            console.log(result);
        });

        // submit group
        // submit individuals
        // submit memberships
        // submit residencies
        // submit relationships
    }

    return vm;
}
