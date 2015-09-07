//'use strict';
//var now = new Date();
//var url = 'http://www.example.com';
//
//function loadModules() {
//    module('ngRoute');
//    //module('openHDS');
//    module('openHDS.core')
//}
//
//describe("Census workflow", function () {
//    var $backend, $rootScope, $route, $location;
//    var censusController;
//    var scope = {model: {}};
//    var uuid = '123-456-789';
//
//    function withBackend(f) {
//        f();
//        $backend.flush();
//        $rootScope.$digest();
//    }
//
//    beforeEach(function() {
//        loadModules();
//        var reference = injectDependencies({scope: scope});
//        scope = reference.scope;
//        $backend = reference.$backend;
//        $rootScope = reference.$rootScope;
//        $route = reference.$route;
//        $location = reference.$location;
//        censusController = reference.censusController;
//    });
//
//    afterEach(function() {
//        $backend.verifyNoOutstandingExpectation();
//        $backend.verifyNoOutstandingRequest();
//    });
//
//    //it("should get the fieldWorker uuid from the backend", function() {
//    //    withBackend(function() {
//    //        setupCensusExpectations($backend);
//    //        scope.navigation.startCensus();
//    //        expect($location.path()).toBe('/census');
//    //
//    //        setLogin(scope);
//    //        scope.fieldWorkerLogin();
//    //    });
//    //
//    //    expect(scope.model.fieldWorker.uuid).toBe("76bb5548-d6c9-4e84-a89b-7263144eae34");
//    //    expect(scope.model.login.backend).toBe("http://www.example.com");
//    //    expect($location.path()).toBe('/location/new');
//    //});
//
//    it("is an error if the user tries to log in twice", function() {
//        withBackend(function() {
//            $backend.expectGET("census/view/home.html").respond(200, 'HTML main');
//
//            delete scope.errors;
//            scope.model.fieldWorker = {"uuid": "123-145"};
//            setLogin(scope);
//            scope.fieldWorkerLogin();
//        });
//
//        expect(scope.errors).toBe("Already logged in. Please log out.");
//    });
//
//
//    it("should submit the new location", function() {
//        withBackend(function() {
//            expect(scope.model.fieldWorkerId).toBeUndefined();
//            setLogin(scope);
//            //expect($location.path()).toBe('/location/new');
//
//            new locationSetup($backend, scope, uuid).addNewLocationToModel();
//
//            scope.createLocation();
//        });
//
//        expect(scope.model.location.uuid).toBe("e2d6b8d2-ff7d-4fcb-b59a-c20ec97106f4");
//        expect($location.path()).toBe('/individual/new');
//    });
//
//
//    //it("should submit the individual to the backend on create", function() {
//    //    withBackend(function() {
//    //        setLogin(scope);
//    //        scope.navigation.startNewIndividual();
//    //        $backend.expectGET("census/view/create-individual.html").respond(200, 'HTML main');
//    //
//    //    })
//    //
//    //    //expect($location.path()).toBe('/individual/new');
//    //    //var individual = scopeCreateIndividual();
//    //    //
//    //    //expect(scope.model.individual.firstName).toBe("John");
//    //    //expect(scope.model.individual.uuid).toBe(uuid);
//    //    //expect($location.path()).toBe('/home');
//    //    //expect(scope.model.fieldWorkerId).toBeNull();
//    //    //expect(scope.relationship).toBe(new scope.Relationship(scope.location, scope.fieldWorker));
//    //});
//
//    it("should relate an individual to a location", function() {
//        withBackend(function() {
//            $backend.expectGET("census/view/home.html").respond(200, 'HTML main');
//        })
//    });
//
//    // should include multiple individuals in a household without having to respecify location
//    // should provide membership to social groups
//    // should provide relationship between individuals
//
//
//
//    // Helper Functions below here
//
//    function setupIndividualsBackend(individual) {
//        $backend.expectPOST(url + '/individuals', individual).respond(201, uuid);
//        $backend.expectGET("census/view/home.html").respond(200, 'HTML main');
//    }
//
//    function scopeCreateIndividual() {
//        scope.model.individual = {
//            externalId: "John Doe",
//            gender: "male",
//            dateOfBirth: "1980-01-13",
//            firstName: "John"
//        };
//
//        setupIndividualsBackend(scope.Individual(now, scope.model.individualBinding));
//
//        scope.createIndividual();
//
//        $backend.flush();
//        return scope.model.individual;
//    }
//});
//
//function setLogin(scope) {
//    scope.model.login = {
//        backend: "http://www.example.com",
//        username: "fieldworker",
//        password: "password"
//    };
//}
//
//function injectDependencies(reference) {
//    inject(function($controller, $http, $httpBackend, _$rootScope_, _$route_, _$location_) {
//        reference.$backend = $httpBackend;
//        reference.$rootScope = _$rootScope_;
//        reference.$route = _$route_;
//        reference.$location = _$location_;
//        reference.censusController = $controller('CensusController', {
//            $scope: reference.scope,
//            $http: $http
//        });
//
//        reference.scope.Date = function() {
//            return now;
//        }
//    });
//
//    return reference;
//}
//
//function locationSetup($backend, scope, locationsResponse) {
//
//    var location = scope.Location(now, scope.model.locationBinding);
//
//    this.addNewLocationToModel = function() {
//        setupLocationsExpectations($backend, scope);
//        this.setupModel();
//    };
//
//    this.setupModel = function() {
//        var model = {
//            "collectedByUuid": "abc-123",
//            "locationHierarchyUuid": "def-123",
//            "location": {
//                "collectionDateTime": "2015-08-29T16:30Z",
//                "extId": "A place",
//                "name": "Test Place",
//                "type": "Home",
//                "longitude": "74.0000",
//                "latitude": "41.0000",
//                "accuracy": "1.000000",
//                "altitude": "1.000000",
//                "buildingNumber": "0",
//                "floorNumber": "1",
//                "regionName": "Northeast",
//                "provinceName": "New York",
//                "subDistrictName": "Queens",
//                "districtName": "Sunnyside",
//                "sectorName": "Sunnyside Gardens",
//                "localityName": "Sunnyside Gardens",
//                "communityName": "Sunnyside Gardens",
//                "communityCode": "11104",
//                "mapAreaName": "Testing",
//                "description": "A Test"
//            }
//        };
//
//        scope.model.location = model;
//    };
//    return this;
//}
//
//function setupCensusExpectations($backend) {
//    $backend.expectGET("http://www.example.com/fieldWorkers/bulk").respond(200, fieldWorkersResponse());
//    $backend.expectGET("census/view/create-location.html").respond(200, 'HTML main');
//}
//
//function setupLocationsExpectations($backend, scope) {
//    var location = scope.Location(now, scope.model.locationBinding);
//
//    $backend.expectPOST(url + '/locations', location).respond(201, locationsResponse());
//    $backend.expectGET("census/view/create-individual.html").respond(200, 'HTML main');
//
//}
//
//function fieldWorkersResponse() {
//    return [
//        {
//            "uuid": "76bb5548-d6c9-4e84-a89b-7263144eae34",
//            "insertBy": {
//                "uuid": "UNKNOWN"
//            },
//            "insertDate": "2015-08-30T00:09:15.636Z[UTC]",
//            "lastModifiedBy": {
//                "uuid": "UNKNOWN"
//            },
//            "lastModifiedDate": "2015-08-30T00:09:15.636Z[UTC]",
//            "fieldWorkerId": "fieldworker",
//            "firstName": "default fieldworker",
//            "lastName": "default fieldworker",
//            "passwordHash": "password"
//        },
//        {
//            "uuid": "UNKNOWN",
//            "insertBy": {
//                "uuid": "UNKNOWN"
//            },
//            "insertDate": "2015-08-30T00:09:15.644Z[UTC]",
//            "lastModifiedBy": {
//                "uuid": "UNKNOWN"
//            },
//            "lastModifiedDate": "2015-08-30T00:09:15.644Z[UTC]",
//            "fieldWorkerId": "UNKNOWN_NAME",
//            "passwordHash": "UNKNOWN_NAME"
//        }
//    ];
//}
//
//function locationsResponse() {
//    var response = {
//        "uuid": "e2d6b8d2-ff7d-4fcb-b59a-c20ec97106f4",
//        "insertBy": {
//            "uuid": "UNKNOWN"
//        },
//        "insertDate": "2015-09-05T12:25:29.247Z[UTC]",
//        "lastModifiedBy": {
//            "uuid": "UNKNOWN"
//        },
//        "lastModifiedDate": "2015-09-05T12:25:29.247Z[UTC]",
//        "collectedBy": {
//            "uuid": "76bb5548-d6c9-4e84-a89b-7263144eae34"
//        },
//        "collectionDateTime": "2015-09-05T12:25:29.247Z[UTC]",
//        "extId": "location-0",
//        "name": "location-0",
//        "type": "RURAL",
//        "locationHierarchy": {
//            "uuid": "80bd4d80-504d-4b13-8ce2-09d3fd112170"
//        },
//        "description": "sample location",
//        "link": []
//    };
//    return response;
//}
