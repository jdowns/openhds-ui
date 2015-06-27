'use strict';

/* Services */

var openhdsServices = angular.module('openhdsServices', ['ngResource']);

openhdsServices.factory('LocationHierarchies', ['$resource',
    function($resource){
        return $resource('/locationhierarchies', {}, {
            query: {method:'GET', params:{}, isArray:true}
        });
    }]);

openhdsServices.factory('LocationHierarchyLevels', ['$resource',
    function($resource) {
        return $resource('/locationhierarchylevels', {}, {
            query: {method: 'GET', params:{}, isArray:true}
        });
    }]);

