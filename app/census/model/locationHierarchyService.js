'use strict';

angular.module('openHDS.model').factory('LocationHierarchyService', LocationHierarchyService);

LocationHierarchyService.$inject = ['BackendService', 'ModelService'];

function LocationHierarchyService(BackendService, ModelService) {

    return {
        getHierarchies: getHierarchies
    };
    //
    //function getHierarchies(callback) {
    //    if (ModelService.locationHierarchy.keys(obj).length === 0) {
    //        BackendService.get("/locationHierarchies")
    //            .then(
    //            function(response) {
    //                var hierarchies = response.data;
    //                ModelService.locationHierarchy = hierarchies;
    //                callback(true);
    //            },
    //            function(error) {
    //                console.log(error);
    //                callback(false);
    //            }
    //        );
    //    }
    //}
}