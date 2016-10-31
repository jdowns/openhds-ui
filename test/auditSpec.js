describe('AuditController', function() {

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
    beforeEach(module('AuditModule'));
    beforeEach(module('openhds'));
    beforeEach(module('smart-table'));

    beforeEach(inject(function(_$controller_, _$httpBackend_,
                               _$rootScope_, _$location_){

        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $location = _$location_;
        var args = {};
        controller = _$controller_('AuditController', args);
        $rootScope.restApiUrl = 'http://example.com';
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Inits controller', function() {
        $httpBackend.expectGET('http://example.com/projectCodes/bulk.json')
            .respond('codes');
        $httpBackend.expectGET('http://example.com/fieldWorkers/bulk.json')
            .respond([{uuid: 1}]);
        $httpBackend.expectGET('http://example.com/locationHierarchyLevels/bulk.json')
            .respond([{uuid: 2}]);
        $httpBackend.expectGET('http://example.com/locationHierarchies/bulk.json')
            .respond([{uuid: 1, level: {uuid: 2}}]);
        $httpBackend.expectGET('http://example.com/locationHierarchyLevels/bulk.json')
            .respond({uuid: 2});

        controller.init();

        $httpBackend.flush();
        expect(controller).toBeDefined();
    });

    it('clears results', function() {
        controller.queryResult = {};

        controller.clearResults();
        expect(controller.queryResult.entityType).toBeNull();
        expect(controller.queryResult.data).toEqual([]);
        expect(controller.queryResult.displayCollection).toEqual([]);
    });

    it('does nothing if entityType is null', function() {
        controller.entityType = null;
        controller.lookupEntity();

        expect(controller.toSubmit).toEqual({});
        expect(controller.queryResult.entityType).toBeNull();
    });

    it('does nothing if entityType is invalid', function() {
        controller.entityType = "foo";
        controller.lookupEntity();

        expect(controller.toSubmit).toEqual({});
        expect(controller.queryResult.entityType).toEqual("foo");
    });

    it('looks up location', function() {
        $httpBackend.expectGET('http://example.com/locations/external/id')
            .respond({content: {uuid: 1}});
        controller.searchExtId = 'id';
        controller.entityType = "location";
        controller.lookupEntity();

        $httpBackend.flush();
        expect(controller.currentEntity).toEqual({uuid: 1});
        expect(controller.queryResult).toEqual({
            entityType: "location",
            data: {uuid: 1},
            displayCollection: [{uuid: 1}]
        });
    });

    it('looks up individual', function() {
        $httpBackend.expectGET('http://example.com/individuals/external/id')
            .respond({content: {uuid: 1}});
        controller.searchExtId = 'id';
        controller.entityType = "individual";
        controller.lookupEntity();

        $httpBackend.flush();
        expect(controller.currentEntity).toEqual({uuid: 1});
        expect(controller.queryResult).toEqual({
            entityType: "individual",
            data: {uuid: 1},
            displayCollection: [{uuid: 1}]
        });
    });

    it('looks up social group', function() {
        $httpBackend.expectGET('http://example.com/socialGroups/external/id')
            .respond({content: {uuid: 1}});
        controller.searchExtId = 'id';
        controller.entityType = "socialGroup";
        controller.lookupEntity();

        $httpBackend.flush();
        expect(controller.currentEntity).toEqual({uuid: 1});
        expect(controller.queryResult).toEqual({
            entityType: "socialGroup",
            data: {uuid: 1},
            displayCollection: [{uuid: 1}]
        });
    });

    it('sets temp as copy', function() {
        controller.currentEntity = {'foo': 1, test: {a: 2}};
        controller.setTemp('xyz');

        expect(controller.xyz).toEqual({'foo': 1, test: {a: 2}});
        expect(controller.xyz).not.toBe({'foo': 1, test: {a: 2}});
    });

    it('saves location', function() {
        var tempLoc = {
            registrationDateTime: "then",
            uuid: 123,
            entityStatus: "status",
            collectedBy: "fw",
            extId: "123",
            name: "foo",
            type: "test",
            collectionDateTime: "later",
            description: "description",
            locationHierarchy: {uuid: 1}
        };

        var expected = {
            registrationDateTime: "then",
            location: {
                uuid: 123,
                entityStatus: "status",
                collectedBy: "fw",
                collectionDateTime: "later",
                extId: "123",
                name: "foo",
                type: "test",
                description: "description" },
            locationHierarchyUuid: 1 };

        controller.collectionDateTime = "then";
        controller.tempLoc = tempLoc;
        controller.saveLocation();
        expect(controller.toSubmit).toEqual(expected);
    });

    it('saves individual', function() {
        var tempIndiv = {
            registrationDateTime: "then",
            uuid: 123,
            entityStatus: "status",
            collectedBy: "fw",
            extId: "123",
            name: "foo",
            type: "test",
            collectionDateTime: "later",
            firstName: "firstName",
            lastName: "lastName"
        };

        var expected = {
            registrationDateTime: "then",
            individual: {
                uuid: 123,
                entityStatus: "status",
                collectedBy: "fw",
                collectionDateTime: "later",
                extId: "123",
                firstName: "firstName",
                lastName: "lastName"
            }
        };

        controller.collectionDateTime = "then";
        controller.tempIndiv = tempIndiv;
        controller.saveIndividual();
        expect(controller.toSubmit).toEqual(expected);
    });

    it('saves social group', function() {
        var tempSocial = {
            registrationDateTime: "then",
            uuid: 123,
            groupName: "groupName",
            groupType: "type",
            collectedBy: "fw",
            extId: "123",
            collectionDateTime: "later"
        };

        var expected = {
            registrationDateTime: "then",
            socialGroup: {
                uuid: 123,
                groupName: "groupName",
                groupType: "type",
                collectedBy: "fw",
                collectionDateTime: "later",
                extId: "123"
            }
        };

        controller.collectionDateTime = "then";
        controller.tempSocial = tempSocial;
        controller.saveSocialGroup();
        expect(controller.toSubmit).toEqual(expected);
    });

    it('Save location hierarchy saves location hierarchy', function() {
        controller.selectedHierarchy = [0, 1, 2, 3];
        controller.locationHierarchies = {
            0: [],
            1: [{uuid: 2}],
            2: [{uuid: 3}],
            3: []
        };
        controller.saveLocationHierarchy();

        expect(controller.currentHierarchy).toEqual({uuid: 3});
    });

    it('short circuits hierarchy search if entity type is null', function() {
        controller.entityType = null;
        controller.queryResult = {};

        controller.searchByHierarchy();
        expect(controller.queryResult.entityType).toBeNull();
    });

    it('short circuits hierarchy search if entity type is unknown', function() {
        controller.entityType = 'wat?!';
        controller.queryResult = {};

        controller.searchByHierarchy();
        expect(controller.queryResult.entityType).toEqual('wat?!');
    });

    it('searches for location by hierarchy', function() {
        $httpBackend.expectGET('http://example.com/locations.json?locationHierarchyUuid=1')
            .respond({content: [{uuid: 123}]});
        controller.entityType = 'location';
        controller.currentHierarchy = {uuid: 1};
        controller.queryResult = {};

        controller.searchByHierarchy();

        $httpBackend.flush();
        expect(controller.queryResult.entityType).toEqual('location');
        expect(controller.queryResult.data[0].uuid).toEqual(123);
    });

    it('searches for individual by hierarchy', function() {
        $httpBackend.expectGET('http://example.com/individuals.json?locationHierarchyUuid=1')
            .respond({content: [{uuid: 123}]});
        controller.entityType = 'individual';
        controller.currentHierarchy = {uuid: 1};
        controller.queryResult = {};

        controller.searchByHierarchy();

        $httpBackend.flush();
        expect(controller.queryResult.entityType).toEqual('individual');
        expect(controller.queryResult.data[0].uuid).toEqual(123);
    });

    it('shows entityJsonModal', function() {
        var modalCalled = false;
        $ = function() {
            return {
                modal: function() {
                    modalCalled = true;
                }
            };
        };

        controller.viewJson('foo');
        expect(controller.entityToView).toEqual('foo');
        expect(modalCalled).toBe(true);
        delete $;
    });

    it('shows edit location Modal', function() {
        var modalCalled = false;
        $ = function() {
            return {
                modal: function() {
                    modalCalled = true;
                }
            };
        };

        controller.editLocation('foo');

        expect(controller.tempLoc).toEqual("foo");
        expect(modalCalled).toBe(true);
        delete $;
    });

    it('shows edit individual Modal', function() {
        var modalCalled = false;
        $ = function() {
            return {
                modal: function() {
                    modalCalled = true;
                }
            };
        };

        controller.editIndividual('foo');

        expect(controller.tempIndiv).toEqual("foo");
        expect(modalCalled).toBe(true);
        delete $;
    });


    it('shows edit social group Modal', function() {
        var modalCalled = false;
        $ = function() {
            return {
                modal: function() {
                    modalCalled = true;
                }
            };
        };

        controller.editSocialGroup('foo');

        expect(controller.tempSocial).toEqual("foo");
        expect(modalCalled).toBe(true);
        delete $;
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
});
