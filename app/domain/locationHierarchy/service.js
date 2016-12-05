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

    function Tree(data) {

        function createNode(data) {
            return {
                id: data.uuid,
                title: data.extId,
                collapsed: true,
                nodes: []
            };
        }

        // Modified from http://stackoverflow.com/questions/14446511/what-is-the-most-efficient-method-to-groupby-on-a-javascript-array-of-objects/34890276#34890276
        function groupByParent(data) {
            var key = "parent";
            return data.reduce(function(rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        };

        function buildTree(root, dataByParent) {
            var tree = createNode(root);
            var children = dataByParent[tree.id];

            if (children !== undefined) {
                tree.nodes = children.map(function(child) {
                    return buildTree(child, dataByParent);
                });
            }
            return tree;
        }

        var nodesByParent = groupByParent(data);
        var root = nodesByParent[null][0]; // HIERARCHY_ROOT has a null parent!

        return buildTree(root, nodesByParent);
    }


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
        var tree = Tree(locationHierarchies);
        return [tree];
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

    service.delete = function(id, reason, success, failure) {
        EntityService.safeDelete(urlBase, id, reason)
            .then(function(response) {
                if (response.data.length > 0) {
                    console.log('unable to delete entity!');
                    failure(response.data);
                } else {
                    console.log('delete succeeded!');
                    success(response.data);
                }
            });
    };

    return service;
}
