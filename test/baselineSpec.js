describe('BaselineController', function() {

    var controller,
        $rootScope,
        $location,
        $httpBackend;


    beforeEach(module('LoginModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('openhds'));
    beforeEach(module('smart-table'));

    beforeEach(inject(function(_$controller_,
                               _$httpBackend_,
                               _$rootScope_,
                               _$location_) {

        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $location = _$location_;
        controller = _$controller_('BaselineController');
        $rootScope.restApiUrl = 'http://example.com';
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Remove Selected Social Group updates selectedSocialGroup', function() {
        controller.selectedSocialGroups = ["a", "b", "c"];
        controller.removeSelectedEntity('selectedSocialGroups', "b");
        expect(controller.selectedSocialGroups).toEqual(["a", "c"]);
    });

    it('Should leave selectedSocialGroups alone if group not found', function() {
        controller.selectedSocialGroups = ["a", "b", "c"];
        controller.removeSelectedEntity('selectedSocialGroups', "d");
        expect(controller.selectedSocialGroups).toEqual(["a", "b", "c"]);
    });

    it('Save location hierarchy saves location hierarchy', function() {

        $httpBackend.expectGET('http://example.com/locations/bulk.json?locationHierarchyUuid=3')
            .respond({uuid: 1});
        $httpBackend.expectGET('http://example.com/individuals/bulk.json?locationHierarchyUuid=3')
            .respond({uuid: 1});
        $httpBackend.expectGET('http://example.com/residencies/bulk.json?locationHierarchyUuid=3')
            .respond([{uuid: 1, individual: {uuid: 2}, location: {uuid: 3}}]);


        var hierarchy = {id: 3, title: "foo"};

        controller.saveLocationHierarchy(hierarchy);

        $httpBackend.flush();

        expect(controller.currentHierarchy).toEqual({uuid: 3, extId: "foo"});
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
        $rootScope.restApiUrl = 'http://example.com';
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
            .respond([{fieldWorkerId: "fwid"}]);
        $httpBackend.expectGET("http://example.com/locationHierarchyLevels/bulk.json")
            .respond([{uuid: "lhl"}]);
        $httpBackend.expectGET("http://example.com/locationHierarchies/bulk.json")
            .respond([{uuid: "lh", level: {uuid: "lhl"}}]);
        $httpBackend.expectGET("http://example.com/locationHierarchyLevels/bulk.json")
            .respond([{uuid: "lhl"}]);
        $httpBackend.expectGET("http://example.com/socialGroups/bulk.json")
            .respond([]);

        controller.init();

        $httpBackend.flush();

        delete $;
    });

    it('saves location', function() {

        $httpBackend.expectPOST('http://example.com/locations/validateExtId/extId')
            .respond(true);
        $httpBackend.expectPOST('http://example.com/locations').respond({});
        var location = {
            name: 'name',
            extId: 'extId',
            type: 'UNIT TEST'
        };
        controller.currentFieldWorker = {uuid: 123};
        controller.collectionDateTime = 'nowish';
        controller.currentHierarchy = {uuid: 456};
        controller.submitLocation(location);

        $httpBackend.flush();
    });

    it('sets error message if location extId is invalid', function() {

        $httpBackend.expectPOST('http://example.com/locations/validateExtId/extId')
            .respond(false);
        var location = {
            name: 'name',
            extId: 'extId',
            type: 'UNIT TEST'
        };
        controller.currentFieldWorker = {uuid: 123};
        controller.collectionDateTime = 'nowish';
        controller.currentHierarchy = {uuid: 456};
        controller.submitLocation(location);

        $httpBackend.flush();

        expect(controller.errorMessage).toEqual({statusText: 'Invalid external ID'});
    });

    it('saves social group', function() {

        $httpBackend.expectPOST('http://example.com/socialGroups/validateExtId/extId')
            .respond(true);
        $httpBackend.expectPOST('http://example.com/socialGroups').respond({});
        var socialGroup = {
            name: 'name',
            extId: 'extId',
            type: 'UNIT TEST'
        };
        controller.currentFieldWorker = {uuid: 123};
        controller.collectionDateTime = 'nowish';
        controller.currentHierarchy = {uuid: 456};
        controller.submitSocialGroup(socialGroup);

        $httpBackend.flush();
    });

    it('sets error message if social group extId is invalid', function() {

        $httpBackend.expectPOST('http://example.com/socialGroups/validateExtId/extId')
            .respond(false);
        var socialGroup = {
            name: 'name',
            extId: 'extId',
            type: 'UNIT TEST'
        };
        controller.currentFieldWorker = {uuid: 123};
        controller.collectionDateTime = 'nowish';
        controller.submitSocialGroup(socialGroup);

        $httpBackend.flush();

        expect(controller.errorMessage).toEqual({statusText: 'Invalid external ID'});
    });

    it('sets error message if individual extId is invalid', function() {
        $httpBackend.expectPOST('http://example.com/individuals/validateExtId/extId')
            .respond(false);
        var individual = {
            name: 'name',
            extId: 'extId'
        };
        controller.currentFieldWorker = {uuid: 123};
        controller.collectionDateTime = 'nowish';
        controller.submitIndividual(individual);

        $httpBackend.flush();

        expect(controller.errorMessage).toEqual({statusText: 'Invalid external ID'});
    });

    it('saves membership', function() {
        $httpBackend.expectPOST('http://example.com/memberships').respond({uuid: 1});
        var membership = {
            individual: 'indB',
            socialGroup: 'grp',
            startType: 'UNIT TEST',
            startDate: 'then'
        };
        controller.currentFieldWorker = {uuid: 123};
        controller.collectionDateTime = 'nowish';
        controller.submitMembership(membership);

        $httpBackend.flush();
    });

    it('saves relationship', function() {

        $httpBackend.expectPOST('http://example.com/relationships').respond([{uuid: 1}]);

        var relationship = {
            individualA: 'indA',
            individualB: 'indB',
            startType: 'UNIT TEST',
            startDate: 'then'
        };
        controller.currentFieldWorker = {uuid: 123};
        controller.collectionDateTime = 'nowish';
        controller.submitRelationship(relationship);

        $httpBackend.flush();
    });

    it('Allows a location to be selected', function() {
        controller.setLocation("foo");
        expect(controller.selectedLocation).toEqual("foo");
    });

    it('Allows an individual to be selected', function() {
        controller.setCurrentIndividual("foo");
        expect(controller.currentIndividual).toEqual("foo");
    });
/*
    it('submits residencies', function() {
        $rootScope.restApiUrl = 'http://example.com';
        $httpBackend.expectPOST('http://example.com/residencies',
                                {"collectedByUuid":123,
                                 "individualUuid":456,
                                 "locationUuid":789,
                                 "residency":{
                                     "startType":"test",
                                     "startDate":"startDate",
                                     "collectionDateTime":"then"
                                 }}).respond({uuid: 1});
        controller.residencyStartType = "test";
        controller.currentFieldWorker = {uuid: 123};
        controller.individual = {uuid: 456};
        controller.selectedLocation = {uuid: 789};
        controller.collectionDateTime = "then";
        controller.submitResidency({startDate: "startDate"});
        $httpBackend.flush();

        expect(controller.submittedResidencies).toEqual([{uuid: 1}]);
    });
*/

    it('sets error message', function() {
        controller.errorHandler('oops');
        expect(controller.errorMessage).toEqual('oops');
    });

    it('gets location extId', function() {
        $httpBackend.expectPOST('http://example.com/locations/generateExtId')
            .respond("generatedId");
        controller.getExtId('Location');

        $httpBackend.flush();

        expect(controller.location.extId).toEqual('generatedId');
    });

    it('gets location extId', function() {
        controller.location = {};
        $httpBackend.expectPOST('http://example.com/locations/generateExtId')
            .respond("generatedId");
        controller.getExtId('Location');

        $httpBackend.flush();

        expect(controller.location.extId).toEqual('generatedId');
    });

    it('gets individual extId', function() {
        $httpBackend.expectPOST('http://example.com/individuals/generateExtId')
            .respond("generatedId");
        controller.getExtId('Individual');

        $httpBackend.flush();

        expect(controller.individual.extId).toEqual('generatedId');
    });

    it('gets individual extId', function() {
        controller.individual = {};
        $httpBackend.expectPOST('http://example.com/individuals/generateExtId')
            .respond("generatedId");
        controller.getExtId('Individual');

        $httpBackend.flush();

        expect(controller.individual.extId).toEqual('generatedId');
    });

    it('gets socialgroup extId', function() {
        $httpBackend.expectPOST('http://example.com/socialGroups/generateExtId')
            .respond("generatedId");
        controller.getExtId('SocialGroup');

        $httpBackend.flush();

        expect(controller.socialGroup.extId).toEqual('generatedId');
    });

    it('gets individual extId', function() {
        controller.socialGroup = {};
        $httpBackend.expectPOST('http://example.com/socialGroups/generateExtId')
            .respond("generatedId");
        controller.getExtId('SocialGroup');

        $httpBackend.flush();

        expect(controller.socialGroup.extId).toEqual('generatedId');
    });

    it('does not submit individuals or residencies if extid is invalid', function() {

        $httpBackend.expectPOST('http://example.com/individuals/validateExtId/extId')
            .respond(false);

        //.respond({uuid: "ind-id"});
        var individual = {extId: "extId"},
            residency = {};

        controller.currentFieldWorker = {uuid: 123};
        controller.collectionDateTime = "now";

        controller.submitIndividualAndResidency(individual, residency);
        $httpBackend.flush();

        expect(controller.errorMessage.statusText).toEqual('Invalid external ID');

    });

    it('submits individuals then residencies', function() {
        var individual = {extId: "extId"},
            residency = {};

        $httpBackend.expectPOST('http://example.com/individuals/validateExtId/extId')
            .respond(true);
        $httpBackend.expectPOST('http://example.com/individuals')
            .respond({uuid: "ind-id"});
        $httpBackend.expectPOST('http://example.com/residencies')
            .respond({uuid: 'res-id'});

        controller.currentFieldWorker = {uuid: 123};
        controller.collectionDateTime = "now";
        controller.residencyStartType = "UNIT TEST";
        controller.selectedLocation = {uuid: 'loc-id'};

        controller.submitIndividualAndResidency(individual, residency);
        $httpBackend.flush();

        expect(controller.currentIndividual).toEqual({uuid: 'ind-id'});
        expect(controller.submittedResidencies).toEqual([{uuid: 'res-id'}]);

    });
});
