describe('BaselineController', function() {

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
    beforeEach(module('BaselineModule'));
    beforeEach(module('openhds'));
    beforeEach(module('smart-table'));

    beforeEach(inject(function(_$controller_, _$httpBackend_,
                               _$rootScope_, _$location_){
        mockLocationService = {
            submit: function(fw, dt, loc) {
                return {
                    then: function(callback) {
                        callback('created a location');
                    }
                };
            },
            getByHierarchy: function(huid) {
                return {
                    then: function(callback) {
                        callback('got locations');
                    }
                };
            }
        };

        mockSocialGroupService = {
            submit: function(fw, dt, loc) {
                return {
                    then: function(callback) {
                        callback('created a location');
                    }
                };
            },
            getAllSocialGroups: function() {
                return {
                    then: function(callback) {
                        callback('allSocialGroups');
                    }
                };
            }
        };

        mockIndividualService = {
            submit: function(fw, dt, loc) {
                return {
                    then: function(callback) {
                        callback('created a location');
                    }
                };
            },
            getByHierarchy: function(huid) {
                return {
                    then: function(callback) {
                        callback('got locations');
                    }
                };
            }
        };

        mockMembershipService = {
            submit: function(fw, dt, loc) {
                return {
                    then: function(callback) {
                        callback('created a location');
                    }
                };
            }
        };

        mockRelationshipService = {
            submitOne: function(fw, dt, loc) {
                return {
                    then: function(callback) {
                        callback('created a relationship');
                    }
                };
            }
        };

        var mockFieldWorkerService = {
            getAllFieldWorkers: function() {
                return {
                    then: function(callback) {
                        callback('allFieldWorkers');
                    }
                };
            }
        };

        var mockLocationHierarchyService = {
            getLevels: function() {
                return {
                    then: function(callback) {
                        callback({data: 'allLevels'});
                    }
                };
            },
            locationHierarchies: function() {
                return {
                    then: function(callback) {
                        callback('allHierarchies');
                    }
                };
            }
        };

        spyOn(mockLocationService, 'submit').and.callThrough();
        spyOn(mockSocialGroupService, 'submit').and.callThrough();
        spyOn(mockIndividualService, 'submit').and.callThrough();
        spyOn(mockMembershipService, 'submit').and.callThrough();
        spyOn(mockRelationshipService, 'submitOne').and.callThrough();

        var args = {
            LocationService: mockLocationService,
            SocialGroupService: mockSocialGroupService,
            FieldWorkerService: mockFieldWorkerService,
            LocationHierarchyService: mockLocationHierarchyService,
            IndividualService: mockIndividualService,
            MembershipService: mockMembershipService,
            RelationshipService: mockRelationshipService
        };

        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $location = _$location_;
        controller = _$controller_('BaselineController', args);
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


    it('Should set selected fieldworker', function() {
        controller.allFieldWorkers = [{uuid: 1}, {uuid: 2}];
        controller.currentFieldWorkerUuid = 2;
        controller.saveFieldWorker();
        expect(controller.currentFieldWorker).toEqual({uuid: 2});
    });


    it('Should set selected fieldworker', function() {
        controller.allFieldWorkers = [{uuid: 1}, {uuid: 2}];
        controller.setFieldWorker(controller.allFieldWorkers[1]);
        expect(controller.currentFieldWorker).toEqual({uuid:2});
    });

    it('Save location hierarchy saves location hierarchy', function() {
        $rootScope.restApiUrl = 'http://example.com';
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

        controller.init();

        $httpBackend.flush();

        expect(controller.allFieldWorkers).toEqual('allFieldWorkers');
        expect(controller.locationHierarchies).toEqual('allHierarchies');
        expect(controller.allHierarchyLevels).toEqual('allLevels');
        expect(controller.allSocialGroups).toEqual('allSocialGroups');

        delete $;
    });

    it('saves location', function() {
        var location = {
            name: 'name',
            extId: 'extId',
            type: 'UNIT TEST'
        };
        controller.currentFieldWorker = {uuid: 123};
        controller.collectionDateTime = 'nowish';
        controller.currentHierarchy = {uuid: 456};
        controller.submitLocation(location);

        expect(mockLocationService.submit).toHaveBeenCalledWith(
            controller.currentFieldWorker,
            controller.collectionDateTime,
            controller.currentHierarchy,
            location
        );
    });

    //  spyOn(mockSocialGroupService, 'submit').and.callThrough();

    it('saves social group', function() {
        var socialGroup = {
            groupName: 'name',
            extId: 'extId',
            groupType: 'UNIT TEST'
        };
        controller.currentFieldWorker = {uuid: 123};
        controller.collectionDateTime = 'nowish';
        controller.submitSocialGroup(socialGroup);

        expect(mockSocialGroupService.submit).toHaveBeenCalledWith(
            controller.currentFieldWorker,
            controller.collectionDateTime,
            socialGroup
        );
    });


    it('saves individual', function() {
        var individual = {
            firstName: 'first',
            lastName: 'last',
            extId: 'extId',
            dateOfBirth: 'nowish',
            gender: 'male'
        };
        controller.currentFieldWorker = {uuid: 123};
        controller.collectionDateTime = 'nowish';
        controller.submitIndividual(individual);

        expect(mockIndividualService.submit).toHaveBeenCalledWith(
            controller.currentFieldWorker,
            controller.collectionDateTime,
            individual
        );
    });


    it('saves membership', function() {
        var membership = {
            individual: 'indB',
            socialGroup: 'grp',
            startType: 'UNIT TEST',
            startDate: 'then'
        };
        controller.currentFieldWorker = {uuid: 123};
        controller.collectionDateTime = 'nowish';
        controller.submitMembership(membership);

        expect(mockMembershipService.submit).toHaveBeenCalledWith(
            controller.currentFieldWorker,
            controller.collectionDateTime,
            membership
        );
    });

    it('saves relationship', function() {
        var relationship = {
            individualA: 'indA',
            individualB: 'indB',
            startType: 'UNIT TEST',
            startDate: 'then'
        };
        controller.currentFieldWorker = {uuid: 123};
        controller.collectionDateTime = 'nowish';
        controller.submitRelationship(relationship);

        expect(mockRelationshipService.submitOne).toHaveBeenCalledWith(
            controller.currentFieldWorker,
            controller.collectionDateTime,
            relationship
        );
    });

    it('Allows a location to be selected', function() {
        controller.setLocation("foo");
        expect(controller.selectedLocation).toEqual("foo");
    });

    it('Allows an individual to be selected', function() {
        controller.setCurrentIndividual("foo");
        expect(controller.currentIndividual).toEqual("foo");
    });

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
});
