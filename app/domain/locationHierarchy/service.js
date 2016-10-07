'use strict';

angular.module('openhds')
    .service('LocationHierarchyService',
             ['$rootScope', '$http', LocationHierarchyService]);

function LocationHierarchyService($rootScope, $http) {
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

    service.locationHierarchies = function(callback) {
        if (service.hierarchies) {
            return service.hierarchies;
        }

        service.getLevels().then(function(result) {
            var levels = result.data.map(LocationHierarchyLevel);

            service.getHierarchies().then(function(result) {
                var hierarchies = result.data.map(
                    function(hierarchyJson) {
                        var hierarchy = new LocationHierarchy(hierarchyJson);

                        hierarchy.level = levels.filter(function(level) {
                            return hierarchyJson.level.uuid === level.uuid;
                        })[0].keyIdentifier || 0;

                        return hierarchy;
                    });

                var hierarchyTree = service.buildTree(hierarchies);
                service.hierarchies = hierarchyTree;
                callback(service.hierarchies);
            });
        });
    };

    return service;
}
