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
        var entity = [{uuid: 1, extId: "id", name: "name", type: "test", description: "description"}];
        $httpBackend.expectGET('http://example.com/locations/external/id')
            .respond({content: entity});
        controller.searchExtId = 'id';
        controller.entityType = "location";
        controller.lookupEntity();

        $httpBackend.flush();
        expect(controller.currentEntity).toEqual(entity);
        expect(controller.queryResult).toEqual({
            entityType: "location",
            data: entity,
            displayCollection: entity
        });
    });

    it('looks up individual', function() {
        var entity = [{uuid: 1, extId: "id", firstName: "fname", lastName: "lname", gender: "test", dateOfBirth: "dob"}];
        $httpBackend.expectGET('http://example.com/individuals/external/id')
            .respond({content: entity});
        controller.searchExtId = 'id';
        controller.entityType = "individual";
        controller.lookupEntity();

        $httpBackend.flush();
        expect(controller.currentEntity).toEqual(entity);
        expect(controller.queryResult).toEqual({
            entityType: "individual",
            data: entity,
            displayCollection: entity});
    });

    it('looks up social group', function() {
        var entity = [{uuid: 1, extId: "id", groupName: "group", groupType: "type"}];
        $httpBackend.expectGET('http://example.com/socialGroups/external/id')
            .respond({content: entity});
        controller.searchExtId = 'id';
        controller.entityType = "socialGroup";
        controller.lookupEntity();

        $httpBackend.flush();
        expect(controller.currentEntity).toEqual(entity);
        expect(controller.queryResult).toEqual({
            entityType: "socialGroup",
            data: entity,
            displayCollection: entity
        });
    });

    it('looks up visit', function() {
        var entity = [{uuid: 1, extId: "id", collectionDateTime: "then"}];
        $httpBackend.expectGET('http://example.com/visits/external/id')
            .respond({content: entity});
        controller.searchExtId = 'id';
        controller.entityType = "visit";
        controller.lookupEntity();

        $httpBackend.flush();
        expect(controller.currentEntity).toEqual(entity);
        expect(controller.queryResult).toEqual({
            entityType: "visit",
            data: entity,
            displayCollection: entity
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

        expect(controller.searchHierarchy).toEqual({uuid: 3});
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
        controller.searchHierarchy = {uuid: 1};
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
        controller.searchHierarchy = {uuid: 1};
        controller.queryResult = {};

        controller.searchByHierarchy();

        $httpBackend.flush();
        expect(controller.queryResult.entityType).toEqual('individual');
        expect(controller.queryResult.data[0].uuid).toEqual(123);
    });

   it('searches for visit by hierarchy', function() {
        $httpBackend.expectGET('http://example.com/visits.json?locationHierarchyUuid=1')
            .respond({content: [{uuid: 123}]});
        controller.entityType = 'visit';
        controller.searchHierarchy = {uuid: 1};
        controller.queryResult = {};

        controller.searchByHierarchy();

        $httpBackend.flush();
        expect(controller.queryResult.entityType).toEqual('visit');
        expect(controller.queryResult.data[0].uuid).toEqual(123);
    });

   it('does not search by fieldworker if entity type is null', function() {
        controller.entityType = null;
        controller.searchByFieldWorker();
        expect(controller.queryResult.entityType).toBeNull();
    });

   it('does not search by fieldworker if entity type is null', function() {
        controller.entityType = "not a real entity";
        controller.searchByFieldWorker();
        expect(controller.queryResult.entityType).toEqual("not a real entity");
    });

   it('searches for individual by fieldWorker', function() {
        $httpBackend.expectGET('http://example.com/individuals.json?fieldWorkerId=fieldWorker')
            .respond({content: [{uuid: 123}]});
        controller.entityType = 'individual';
        controller.currentFieldWorker = {id: "fieldWorker"}
        controller.searchHierarchy = {uuid: 1};
        controller.queryResult = {};

        controller.searchByFieldWorker();

        $httpBackend.flush();
        expect(controller.queryResult.entityType).toEqual('individual');
        expect(controller.queryResult.data[0].uuid).toEqual(123);
   });

   it('searches for location by fieldWorker', function() {
        $httpBackend.expectGET('http://example.com/locations.json?fieldWorkerId=fieldWorker')
            .respond({content: [{uuid: 123}]});
        controller.entityType = 'location';
        controller.currentFieldWorker = {id: "fieldWorker"}
        controller.searchHierarchy = {uuid: 1};
        controller.queryResult = {};

        controller.searchByFieldWorker();

        $httpBackend.flush();
        expect(controller.queryResult.entityType).toEqual('location');
        expect(controller.queryResult.data[0].uuid).toEqual(123);
    });

   it('searches for socialGroup by fieldWorker', function() {
        $httpBackend.expectGET('http://example.com/socialGroups.json?fieldWorkerId=fieldWorker')
            .respond({content: [{uuid: 123}]});
        controller.entityType = 'socialGroup';
        controller.currentFieldWorker = {id: "fieldWorker"}
        controller.searchHierarchy = {uuid: 1};
        controller.queryResult = {};

        controller.searchByFieldWorker();

        $httpBackend.flush();
        expect(controller.queryResult.entityType).toEqual('socialGroup');
        expect(controller.queryResult.data[0].uuid).toEqual(123);
    });

   it('searches for visit by fieldWorker', function() {
        $httpBackend.expectGET('http://example.com/visits.json?fieldWorkerId=fieldWorker')
            .respond({content: [{uuid: 123}]});
        controller.entityType = 'visit';
        controller.currentFieldWorker = {id: "fieldWorker"}
        controller.searchHierarchy = {uuid: 1};
        controller.queryResult = {};

        controller.searchByFieldWorker();

        $httpBackend.flush();
        expect(controller.queryResult.entityType).toEqual('visit');
        expect(controller.queryResult.data[0].uuid).toEqual(123);
    });

    it('does not search by field if currentSearch is null', function() {
        controller.currentSearch = null;
        controller.searchByFields();
        expect(controller.queryResult).toEqual({entityType: null, data: [], displayCollection: []});
    });

    it('does not search by field if entityType is null', function() {
        controller.currentSearch = {key: "value", anotherKey: null};
        controller.queryResult.entityType = "something from an old search";
        controller.entityType = null;
        controller.searchByFields();
        expect(controller.queryResult.entityType).toBeNull();
    });

    it('does not search by field if entityType is unknown', function() {
        controller.currentSearch = {key: "value", anotherKey: null};
        controller.queryResult.entityType = "something from an old search";
        controller.entityType = "things that don't exist";
        controller.searchByFields();
        expect(controller.queryResult.entityType).toEqual("things that don't exist");
    });

    it('searches locations by field', function() {
        $httpBackend.expectGET('http://example.com/locations/search?key=value&anotherKey=another_value').respond([{uuid: 1}]);
        controller.currentSearch = {key: "value", anotherKey: "another_value"};
        controller.queryResult.entityType = "something from an old search";
        controller.entityType = "location";
        controller.searchByFields();
        $httpBackend.flush();
        expect(controller.queryResult.entityType).toEqual("location");
        expect(controller.queryResult.data).toEqual([{uuid: 1}]);
        expect(controller.queryResult.displayCollection[0].uuid).toEqual(1);
    });

    it('searches individuals by field', function() {
        $httpBackend.expectGET('http://example.com/individuals/search?key=value&anotherKey=another_value').respond([{uuid: 1}]);
        controller.currentSearch = {key: "value", anotherKey: "another_value"};
        controller.queryResult.entityType = "something from an old search";
        controller.entityType = "individual";
        controller.searchByFields();
        $httpBackend.flush();
        expect(controller.queryResult.entityType).toEqual("individual");
        expect(controller.queryResult.data).toEqual([{uuid: 1}]);
        expect(controller.queryResult.displayCollection[0].uuid).toEqual(1);
    });

    it('searches visits by field', function() {
        var when = new Date();
        $httpBackend.expectGET('http://example.com/visits/findByVisitDate?visitDate=' + when.toJSON())
            .respond([{uuid: 1}]);
        //$httpBackend.expectGET('http://example.com/visits/search?key=value&anotherKey=another_value').respond([{uuid: 1}]);


        controller.currentSearch = {key: "value", anotherKey: "another_value", visitDate: when};
        controller.queryResult.entityType = "something from an old search";
        controller.entityType = "visit";
        controller.searchByFields();
        $httpBackend.flush();
        expect(controller.queryResult.entityType).toEqual("visit");
        expect(controller.queryResult.data).toEqual([{uuid: 1}]);
        expect(controller.queryResult.displayCollection[0].uuid).toEqual(1);
    });

    it('searches socialGroups by field', function() {
        $httpBackend.expectGET('http://example.com/socialGroups/search?key=value&anotherKey=another_value').respond([{uuid: 1}]);
        controller.currentSearch = {key: "value", anotherKey: "another_value"};
        controller.queryResult.entityType = "something from an old search";
        controller.entityType = "socialGroup";
        controller.searchByFields();
        $httpBackend.flush();
        expect(controller.queryResult.entityType).toEqual("socialGroup");
        expect(controller.queryResult.data).toEqual([{uuid: 1}]);
        expect(controller.queryResult.displayCollection[0].uuid).toEqual(1);
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

    it('sets error message', function() {
        controller.errorHandler('oops');
        expect(controller.errorMessage).toEqual('oops');
    });

    it('viewRelated sets current entity to row', function() {
        controller.related = {"other": {"individuals": {"membership": "m"}}};
        controller.viewRelated("other", "abc");
        expect(controller.currentEntity).toEqual("abc");
    });

    it('shows relatedSocialGroupModal', function() {
        var modalCalled = false;
        $ = function() {
            return {
                modal: function() {
                    modalCalled = true;
                }
            };
        };
        controller.related = {"socialGroup": {"individual": {"membership": "m"}}};
        controller.viewRelated("socialGroup", "abc");
        expect(modalCalled).toBe(true);
        delete $;
    });

    it('shows relatedIndividualsModal', function() {
        var modalCalled = false;
        $ = function() {
            return {
                modal: function() {
                    modalCalled = true;
                }
            };
        };
        controller.related = {"individual": {"membership": {"socialGroup": "m"}}};
        controller.viewRelated("individual", "abc");
        expect(modalCalled).toBe(true);
        delete $;
    });

    it('shows relatedLocationssModal', function() {
        var modalCalled = false;
        $ = function() {
            return {
                modal: function() {
                    modalCalled = true;
                }
            };
        };
        controller.related = {"location": {"residency": {"individuals": "m"}}};
        controller.viewRelated("location", "abc");
        expect(modalCalled).toBe(true);
        delete $;
    });

    it('shows relatedLocationssModal', function() {
        var modalCalled = false;
        $ = function() {
            return {
                modal: function() {
                    modalCalled = true;
                }
            };
        };
        controller.related = {"visit": {"individual": {"events": "m"}}};
        controller.viewRelated("visit", "abc");
        expect(modalCalled).toBe(true);
        delete $;
    });

    it('toggles socialGroupRelated', function() {
        controller.related = {
            socialGroup: {
                foo: {
                    show: false
                }
            }
        };
        controller.toggleSocialGroupRelated("foo");

        expect(controller.related['socialGroup']['foo'].show).toBe(true);
    });
    it('toggles individualRelated', function() {
        controller.related = {
            individual: {
                foo: {
                    show: false
                }
            }
        };
        controller.toggleIndividualRelated("foo");

        expect(controller.related['individual']['foo'].show).toBe(true);
    });
});
