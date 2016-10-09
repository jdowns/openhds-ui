'use strict';

angular.module('openhds')
    .service('LocationHierarchyService',
             ['$rootScope', '$http', '$q', LocationHierarchyService]);

function LocationHierarchyService($rootScope, $http, $q) {
    var service = this;
    var headers = {
        headers: {
            authorization: "Basic " + $rootScope.credentials
        }
    };

    function LocationHierarchyLevel(json) {
        return {
            uuid: json.uuid,
            name: json.name,
            keyIdentifier: json.keyIdentifier
        };
    }

    function LocationHierarchy(json) {
        return {uuid: json.uuid,
                extId: json.extId,
                name: json.name,
                parent: json.parent ? json.parent.uuid : null
               };
    }

    service.getHierarchies = function() {
        var url = $rootScope.restApiUrl + "/locationHierarchies/bulk.json";
        return $http.get(url, headers);
    };

    service.getLevels = function() {
        var url = $rootScope.restApiUrl + "/locationHierarchyLevels/bulk.json";
        return $http.get(url, headers);
    };

    service.getHierarchy = function(uuid) {
        var url = $rootScope.restApiUrl + "/locationHierarchies/" + uuid;
        return $http.get(url, headers);
    };

    service.buildTree = function(locationHierarchies) {
        var tree = {};

        locationHierarchies.forEach(function(hierarchy) {
            var uuid = hierarchy.uuid;

            tree[uuid] = [];

            if(hierarchy.parent) {
                tree[hierarchy.parent].push(hierarchy);
            }
        });

        return tree;
    };

    service.locationHierarchies = function() {
        if (service.hierarchies) {
            return $q(function(resolve, reject) {
                resolve(service.hierarchies);
            });
        } else {

            var levelsPromise = service.getLevels();
            var hierarchiesPromise = service.getHierarchies();
            return $q(function(resolve, reject) {
                levelsPromise.then(function(response) {
                    var levels = response.data.map(LocationHierarchyLevel);
                    hierarchiesPromise.then(function(response) {
                        var hierarchies = response.data.map(
                            function(hierarchyJson) {
                                var hierarchy = new LocationHierarchy(hierarchyJson);

                                hierarchy.level = levels.filter(function(level) {
                                    return hierarchyJson.level.uuid === level.uuid;
                                })[0].keyIdentifier || 0;

                                return hierarchy;
                            });
                        var hierarchyTree = service.buildTree(hierarchies);
                        service.hierarchies = hierarchyTree;

                        resolve(service.hierarchies);
                    });
                });

            });
        }
    };

    return service;
}
