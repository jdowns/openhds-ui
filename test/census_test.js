'use strict';

describe("Census workflow", function () {
    var $backend, $rootScope, $route, $location;

    var censusController;
    var scope = {};
    var url = 'http://example.com';
    var now = new Date();
    var uuid = '123-456-789';
    var fieldWorkerId = "a-field-worker";

    beforeEach(module('openHDS.census'));
    beforeEach(module('openHDS.model'));

    beforeEach(inject(function($controller, $http, $httpBackend, _$rootScope_, _$route_, _$location_) {
        $backend = $httpBackend;
        $rootScope = _$rootScope_;
        $route = _$route_;
        $location = _$location_;
        censusController = $controller('CensusController', {
            $scope: scope,
            $http: $http
        });
        scope.setServer(url);

        scope.Date = function() {
            return now;
        }
    }));

    afterEach(function() {
        $backend.verifyNoOutstandingExpectation();
        $backend.verifyNoOutstandingRequest();
    });


    it("should submit the new location and the url should be /individuals/new and preserves state", function() {
        scope.startNewLocation();

        expect($location.path()).toBe('/location/new');
        var location = scopeCreateLocation();
        $rootScope.$digest();

        expect(scope.model.fieldWorkerId).toBe(location.collectedBy);
        expect(scope.model.location.uuid).toBe(uuid);
        expect($location.path()).toBe('/individual/new');
        expect(scope.model.fieldWorkerId).toBe(location.collectedBy)
    });


    it("should submit the individual to the backend on create", function() {
        scope.startNewIndividual();
        $backend.expectGET("census/view/create-individual.html").respond(200, 'HTML main');

        $rootScope.$digest();

        expect($location.path()).toBe('/individual/new');
        var individual = scopeCreateIndividual();

        expect(scope.model.individual.firstName).toBe("John");
        expect(scope.model.individual.uuid).toBe(uuid);
        expect($location.path()).toBe('/home');
        //expect(scope.model.fieldWorkerId).toBeNull();
        //expect(scope.relationship).toBe(new scope.Relationship(scope.location, scope.fieldWorker));
    });

    it("should relate an individual to a location", function() {

    });

    // should include multiple individuals in a household without having to respecify location
    // should provide membership to social groups
    // should provide relationship between individuals



    // Helper Functions below here

    function setupLocationsBackend(location) {
        $backend.expectPOST(url + '/locations', location).respond(201, uuid);
        $backend.expectGET("census/view/create-location.html").respond(200, 'HTML main');
        $backend.expectGET("census/view/create-individual.html").respond(200, 'HTML main');

    }

    function setupIndividualsBackend(individual) {
        $backend.expectPOST(url + '/individuals', individual).respond(201, uuid);
        $backend.expectGET("census/view/home.html").respond(200, 'HTML main');
    }


    function scopeCreateLocation(fieldWorkerId) {
        scope.model.locationBinding.externalId = 'Test Location';
        scope.model.locationBinding.name = 'Sunnyside';
        scope.model.locationBinding.locationType = 'Neighborhood';
        scope.model.locationBinding.parent = 'Borough';

        scope.model.fieldWorkerId = fieldWorkerId;

        setupLocationsBackend(scope.Location(now, scope.model.locationBinding));

        scope.createLocation();

        $backend.flush();
        return scope.model.location;
    }

    function scopeCreateIndividual() {
        scope.model.individualBinding.externalId = "John Doe";
        scope.model.individualBinding.gender = "male";
        scope.model.individualBinding.dateOfBirth = "1980-01-13";
        scope.model.individualBinding.firstName = "John";

        setupIndividualsBackend(scope.Individual(now, scope.model.individualBinding));

        scope.createIndividual();

        $backend.flush();
        return scope.model.individual;
    }
});