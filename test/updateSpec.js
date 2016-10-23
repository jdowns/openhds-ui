describe('UpdateController', function() {

    var controller,
        $rootScope,
        $location,
        $httpBackend,
        mockLocationService,
        mockSocialGroupService,
        mockIndividualService,
        mockMembershipService,
        mockRelationshipService;

    beforeEach(module('LoginModule'));
    beforeEach(module('UpdateModule'));
    beforeEach(module('openhds'));
    beforeEach(module('smart-table'));

    beforeEach(inject(function(_$controller_, _$httpBackend_,
                               _$rootScope_, _$location_){

        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $location = _$location_;
	var args = {};
        controller = _$controller_('UpdateController', args);
        $rootScope.restApiUrl = 'http://example.com';
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Inits controller', function() {
        expect(controller).toBeDefined();
    });

    it('submitInMigration sets currentInMigration', function() {
        controller.submitInMigration();
        expect(controller.currentInMigration).toBeNull();
    });

    it('submitOutMigration sets currentOutMigration', function() {
        controller.submitOutMigration();
        expect(controller.currentOutMigration).toBeNull();
    });

    it('submitDeath sets currentDeath', function() {
        $httpBackend.expectPOST("http://example.com/deaths", {
            "collectedByUuid":123,
            "visitUuid":456,
            "individualUuid":789,
            "death":{"deathDate":"then"}
        }) .respond({uuid: "xyz"});

        controller.currentFieldWorker = {uuid: 123};
        controller.currentVisit = {uuid: 456};
        controller.currentIndividual = {uuid: 789};
        controller.submitDeath({deathDate: "then"});
        $httpBackend.flush();

        expect(controller.submittedEvents).toEqual([{uuid: "xyz"}]);
    });

    it('submitPregnancyObservation sets currentPregnancyObservation', function() {
        controller.submitPregnancyObservation();
        expect(controller.currentPregnancyObservation).toBeNull();
    });

    it('submitPregnancyOutcome sets currentPregnancyOutcome', function() {
        controller.submitPregnancyOutcome();
        expect(controller.currentPregnancyOutcome).toBeNull();
    });

    it('finishVisit resets submittedEvents, selectLocation and selectedIndividual', function() {
        controller.finishVisit();
        expect(controller.submittedEvents).toEqual([]);
        expect(controller.selectedLocation).toBeNull();
        expect(controller.selectedIndividual).toBeNull();
    });


    it('Save location hierarchy saves location hierarchy', function() {
        $rootScope.restApiUrl = 'http://example.com';
        $httpBackend.expectGET("http://example.com/locations.json?locationHierarchyUuid=3").respond({content: []});
        $httpBackend.expectGET("http://example.com/individuals.json?locationHierarchyUuid=3").respond({content: []});
        $httpBackend.expectGET("http://example.com/residencies.json?locationHierarchyUuid=3").respond({content: []});
        controller.selectedHierarchy = [0, 1, 2, 3];
        controller.locationHierarchies = {
            0: [],
            1: [{uuid: 2}],
            2: [{uuid: 3}],
            3: []
        };
        controller.saveLocationHierarchy();
        $httpBackend.flush();
        expect(controller.currentHierarchy).toEqual({uuid: 3});
    });

    it('setLocation sets selectedLocation and filters allResidencies', function() {
        controller.allResidencies = [{uuid: 1, name: "test residency"}];
        controller.setLocation({uuid: 1});

        expect(controller.residencies).toEqual([{uuid: 1, name: "test residency"}]);
        expect(controller.selectedLocation).toEqual({uuid: 1});
    });

    it('Available hierarchies returns list of hierarchies', function() {
        controller.selectedHierarchy = [0, 1];
        controller.locationHierarchies = {
            0: [{uuid: 1}],
            1: [{uuid: 2}, {uuid: 3}],
            2: [{uuid: 4}],
            3: [],
            4: []
        };
        var hierarchies = controller.availableHierarchies();
        expect(hierarchies).toEqual([[{uuid: 1}],
                                     [{uuid:2}, {uuid:3}]]);
    });

    it('initializes', function() {
        var event = {
            preventDefault: function() {}
        };
        $ = function(value) {
            return {
                click: function(handler) {
                    handler(event);
                },
                tab: function(e) {
                    tabCalled = e;
                }
            };
        };


        $httpBackend.expectGET("http://example.com/projectCodes/bulk.json")
            .respond(['code1', 'code2']);

        $httpBackend.expectGET("http://example.com/fieldWorkers/bulk.json")
            .respond([{uuid: 1, fieldWorkerId: 1, firstName: "test", "lastName": "test"}]);

        $httpBackend.expectGET("http://example.com/locationHierarchyLevels/bulk.json")
            .respond([{uuid: 2}]);

        $httpBackend.expectGET("http://example.com/locationHierarchies/bulk.json")
            .respond([{uuid: 1, level: {uuid: 2}}]);

        $httpBackend.expectGET("http://example.com/locationHierarchyLevels/bulk.json")
            .respond([{uuid: 1}]);

        controller.init();

        $httpBackend.flush();

        expect(controller.allFieldWorkers).toEqual([{uuid: 1, id: 1, firstName: "test", "lastName": "test"}]);
        expect(controller.locationHierarchies).toEqual({1: []});
        expect(controller.allHierarchyLevels).toEqual([{uuid: 1}]);

        delete $;
    });

    it('sets fieldworker', function() {
        controller.setFieldWorker('foo');
        expect(controller.currentFieldWorker).toEqual('foo');
    });

    it('submits visit', function() {
        $ = function(value) {
            return {
                click: function(handler) {
                    handler(event);
                },
                tab: function(e) {
                    tabCalled = e;
                }
            };
        };

        $httpBackend.expectPOST("http://example.com/visits", {
            "collectedByUuid":123,
            "locationUuid":456,
            "visit":{
                "extId":"visitId",
                "visitDate":"then",
                "collectionDateTime": "then"
            }
        }).respond({uuid: "visit"});
        controller.currentFieldWorker = {uuid: 123};
        controller.selectedLocation = {uuid: 456};
        controller.visitDate = "then";

        controller.visit = {extId: "visitId", visitDate: "then"};

        controller.submitVisit();

        $httpBackend.flush();

        expect(controller.currentVisit).toEqual({uuid: "visit"});

        delete $;
    });
});
