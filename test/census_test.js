'use strict';

describe("Census workflow", function () {
    var censusController;
    var backend;
    var scope = {};

    beforeEach(module('openHDS.census'));

    beforeEach(inject(function($controller, $http, $httpBackend) {
        backend = $httpBackend;
        censusController = $controller('CensusController', {
            $scope: scope,
            $http: $http
        });
    }));


    it("should set the fieldworker when creating a new location", function() {
        var collectedBy = 'field-worker-id';

        scope.createLocation(null, collectedBy, null, null, null, null);

        expect(scope.fieldWorkerId === collectedBy);
    });

    it("should submit the location to the backend on create", function() {
        var url = 'http://example.com';
        scope.setServer(url);

        var collectedBy = 'field-worker-id';
        var externalId = 'a test location';
        var name = 'sunnyside';
        var locationType = 'neighborhood';
        var parent = 'location-hierarchy-id';

        var uuid = '123-145-789';
        var location = new scope.Location(new Date(), collectedBy, externalId, name, locationType, parent);

        backend.expectPOST(url, location).respond(201, uuid);

        scope.createLocation(collectedBy, externalId, name, locationType, parent);

        backend.flush();

        expect(scope.location.uuid).toBe(uuid);
    })

    it("")
});