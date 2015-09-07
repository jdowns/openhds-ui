'use strict';

describe('Location Service', function() {

    beforeEach(module('openHDS.core'));
    beforeEach(module('openHDS.model'));


    beforeEach(module(function ($provide) {
        provide = $provide;
        $provide.value('ModelService',{});
    }));

    beforeEach(inject(function($q, $rootScope) {
        q = $q;
        rootScope = $rootScope
    }));

    it('should create a new location and set it as current', inject(function(LocationService, BackendService, ModelService) {
        withBackendPromisePost(BackendService, function() {
            LocationService.create(createLocationData());
        });

        expect(BackendService.post).toHaveBeenCalledWith("/locations", createLocationData());
        expect(ModelService.currentLocation).toBe("abc-123");
    }));
});

function withBackendPromisePost(backend, f) {
    var deferred = q.defer();
    var httpPromise = deferred.promise;
    var responseData = {uuid: "abc-123"};
    deferred.resolve({data: responseData});
    spyOn(backend, 'post').and.returnValue(httpPromise);
    f();
    rootScope.$apply();
}

function createLocationData() { //TODO: add the extra stuff to make this a legit call
    return {
        "location": {
            "collectionDateTime": "2015-08-29T16:30Z",
            "extId": "A place",
            "name": "Test Place",
            "type": "Home",
            "longitude": "74.0000",
            "latitude": "41.0000",
            "accuracy": "1.000000",
            "altitude": "1.000000",
            "buildingNumber": "0",
            "floorNumber": "1",
            "regionName": "Northeast",
            "provinceName": "New York",
            "subDistrictName": "Queens",
            "districtName": "Sunnyside",
            "sectorName": "Sunnyside Gardens",
            "localityName": "Sunnyside Gardens",
            "communityName": "Sunnyside Gardens",
            "communityCode": "11104",
            "mapAreaName": "Testing",
            "description": "A Test"
        }
    };
}