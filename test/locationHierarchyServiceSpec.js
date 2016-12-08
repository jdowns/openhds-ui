var hierarchyLevels = [
    {
        uuid: "a0beb829-9a7f-4359-b8e6-90aba55ff5fa",
        name: "location-hierarchy-level-0"},
    {
        uuid: "fc815028-79d0-40db-8274-ce0dcde33ca4",
        keyIdentifier: 1,
        name: "location-hierarchy-level-1"
    },
    {
        uuid: "84f34cbd-c522-4d62-a2be-d6a5eb30c9d6",
        keyIdentifier: 2,
        name: "location-hierarchy-level-2"
    },
    {
        uuid: "UNKNOWN",
        keyIdentifier: 433141802,
        name: "UNKNOWN_STATUS"
    }
];

var locationHierarchies = [
    {
        uuid: "HIERARCHY_ROOT",
        extId: "hierarchy-root",
        name: "hierarchy-root",
        level: {uuid: "UNKNOWN"}
    },
    {
        uuid: "32992957-e1ab-4b0f-9b76-1dd9e70f1cdf",
        extId: "hierarchy-0",
        name: "hierarchy-0",
        parent: {uuid: "HIERARCHY_ROOT"},
        level: {uuid: "a0beb829-9a7f-4359-b8e6-90aba55ff5fa"}
    },
    {
        uuid: "93462979-8ac3-4ff9-8ae6-31166d246075",
        extId: "hierarchy-0-1",
        name: "hierarchy-0-1",
        parent: {uuid: "32992957-e1ab-4b0f-9b76-1dd9e70f1cdf"},
        level: {uuid: "fc815028-79d0-40db-8274-ce0dcde33ca4"}
    },
    {
        uuid: "84a5f518-daf4-4847-9b18-4bea25122a93",
        extId: "hierarchy-0-1-1",
        name: "hierarchy-0-1-1",
        parent: {uuid: "93462979-8ac3-4ff9-8ae6-31166d246075"},
        level: {uuid: "84f34cbd-c522-4d62-a2be-d6a5eb30c9d6"}
    },
    {
        uuid: "be852417-1f1c-4c27-9202-85c04a5811da",
        extId: "hierarchy-0-1-2",
        name: "hierarchy-0-1-2",
        parent: {uuid: "93462979-8ac3-4ff9-8ae6-31166d246075"},
        level: {uuid: "84f34cbd-c522-4d62-a2be-d6a5eb30c9d6"}
    },
    {
        uuid: "5d1997b2-657f-436b-bd4d-7c54a980a0a8",
        extId: "hierarchy-0-1-3",
        name: "hierarchy-0-1-3",
        parent: {uuid: "93462979-8ac3-4ff9-8ae6-31166d246075"},
        level: {uuid: "84f34cbd-c522-4d62-a2be-d6a5eb30c9d6"}
    },
    {
        uuid: "6295c8d2-1ff3-4491-a433-90b94f91e65b",
        extId: "hierarchy-0-2",
        name: "hierarchy-0-2",
        parent: {uuid: "32992957-e1ab-4b0f-9b76-1dd9e70f1cdf"},
        level: {uuid: "fc815028-79d0-40db-8274-ce0dcde33ca4"}
    },
    {
        uuid: "c34da482-c5f9-40b7-b9d3-a81eaaf0dbb9",
        extId: "hierarchy-0-2-1",
        name: "hierarchy-0-2-1",
        parent: {uuid: "6295c8d2-1ff3-4491-a433-90b94f91e65b"},
        level: {uuid: "84f34cbd-c522-4d62-a2be-d6a5eb30c9d6"}
    }
];

var hierarchyMap =
        {
            HIERARCHY_ROOT:[
                {
                    uuid: '32992957-e1ab-4b0f-9b76-1dd9e70f1cdf',
                    extId: 'hierarchy-0',
                    name: 'hierarchy-0',
                    parent: 'HIERARCHY_ROOT',
                    level: 0
                }
            ],
            "32992957-e1ab-4b0f-9b76-1dd9e70f1cdf":[
                {
                    uuid: '93462979-8ac3-4ff9-8ae6-31166d246075',
                    extId: 'hierarchy-0-1',
                    name: 'hierarchy-0-1',
                    parent: '32992957-e1ab-4b0f-9b76-1dd9e70f1cdf',
                    level: 1
                },
                {
                    uuid: '6295c8d2-1ff3-4491-a433-90b94f91e65b',
                    extId: 'hierarchy-0-2',
                    name: 'hierarchy-0-2',
                    parent: '32992957-e1ab-4b0f-9b76-1dd9e70f1cdf',
                    level: 1
                }
            ],
            "93462979-8ac3-4ff9-8ae6-31166d246075":[
                {
                    uuid: '84a5f518-daf4-4847-9b18-4bea25122a93',
                    extId: 'hierarchy-0-1-1',
                    name: 'hierarchy-0-1-1',
                    parent: '93462979-8ac3-4ff9-8ae6-31166d246075',
                    level: 2 },
                {
                    uuid: 'be852417-1f1c-4c27-9202-85c04a5811da',
                    extId: 'hierarchy-0-1-2',
                    name: 'hierarchy-0-1-2',
                    parent: '93462979-8ac3-4ff9-8ae6-31166d246075',
                    level: 2 },
                {
                    uuid: '5d1997b2-657f-436b-bd4d-7c54a980a0a8',
                    extId: 'hierarchy-0-1-3', name: 'hierarchy-0-1-3',
                    parent: '93462979-8ac3-4ff9-8ae6-31166d246075',
                    level: 2
                }
            ],
            "84a5f518-daf4-4847-9b18-4bea25122a93": [],
            "be852417-1f1c-4c27-9202-85c04a5811da": [],
            "5d1997b2-657f-436b-bd4d-7c54a980a0a8": [],
            "6295c8d2-1ff3-4491-a433-90b94f91e65b": [
                {
                    uuid: 'c34da482-c5f9-40b7-b9d3-a81eaaf0dbb9',
                    extId: 'hierarchy-0-2-1',
                    name: 'hierarchy-0-2-1',
                    parent: '6295c8d2-1ff3-4491-a433-90b94f91e65b',
                    level: 2
                }
            ],
            "c34da482-c5f9-40b7-b9d3-a81eaaf0dbb9": []
        };


describe('LocationHierarchyService Test', function() {

    var service, $httpBackend, $rootScope;

    beforeEach(module('smart-table'));
    beforeEach(module('LoginModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('openhds'));
    beforeEach(module('LoginModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('smart-table'));

    beforeEach(inject(function(_LocationHierarchyService_, $injector){
        service = _LocationHierarchyService_;
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $rootScope.restApiUrl = 'http://example.com';
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should build hierarchy map', function() {

        var expected = [
            {id: 'ROOT_HIERARCHY',
             title: 'ROOT',
             collapsed: true,
             nodes: [{id: '123',
                      title: 'abc',
                      collapsed: true,
                      nodes: []}]
            },
        ];

        var locationHierarchies = [{uuid: 'ROOT_HIERARCHY',
                                    parent: null,
                                    extId: 'ROOT'},
                                   {uuid: '123',
                                    extId: 'abc',
                                    parent: 'ROOT_HIERARCHY'}];

        var tree = service.buildTree(locationHierarchies);

        expect(expected).toEqual(tree);
    });

    it('should request location hierarchies', function() {
        $httpBackend.expectGET('http://example.com/locationHierarchies/bulk.json')
            .respond(200);

        service.getHierarchies();

        $httpBackend.flush();
    });

    it('should request location hierarchy levels', function() {
        $httpBackend.expectGET('http://example.com/locationHierarchyLevels/bulk.json')
            .respond(200);

        service.getLevels();

        $httpBackend.flush();
    });

    it('should get hierarchy level tree', function() {
        $httpBackend.expectGET('http://example.com/locationHierarchyLevels/bulk.json')
            .respond(200, hierarchyLevels);

        $httpBackend.expectGET('http://example.com/locationHierarchies/bulk.json')
            .respond(200, locationHierarchies);

        var expected = [
            {
                id: 'HIERARCHY_ROOT',
                title: 'hierarchy-root',
                collapsed: true,
                nodes: [
                    { id: '32992957-e1ab-4b0f-9b76-1dd9e70f1cdf',
                      title: 'hierarchy-0',
                      collapsed: true,
                      nodes: [
                          { id: '93462979-8ac3-4ff9-8ae6-31166d246075',
                            title: 'hierarchy-0-1',
                            collapsed: true,
                            nodes: [
                                { id: '84a5f518-daf4-4847-9b18-4bea25122a93',
                                  title: 'hierarchy-0-1-1',
                                  collapsed: true,
                                  nodes: [] },
                                { id: 'be852417-1f1c-4c27-9202-85c04a5811da',
                                  title: 'hierarchy-0-1-2',
                                  collapsed: true,
                                  nodes: [] },
                                { id: '5d1997b2-657f-436b-bd4d-7c54a980a0a8',
                                  title: 'hierarchy-0-1-3',
                                  collapsed: true,
                                  nodes: [] }
                            ]
                          },
                          { id: '6295c8d2-1ff3-4491-a433-90b94f91e65b',
                            title: 'hierarchy-0-2',
                            collapsed: true,
                            nodes: [
                                { id: 'c34da482-c5f9-40b7-b9d3-a81eaaf0dbb9',
                                  title: 'hierarchy-0-2-1',
                                  collapsed: true,
                                  nodes: []
                                }
                            ]
                          }
                      ]
                    }
                ]
            }
        ];
        var hierarchyPromise = service.locationHierarchies();
        hierarchyPromise.then(function(hierarchies) {
            expect(expected).toEqual(hierarchies);
        });

        $httpBackend.flush();

    });

    it('should get a single hierarchy', function() {
        $httpBackend.expectGET('http://example.com/locationHierarchies/a-uuid')
            .respond(200, {uuid: 'hierarchy-id'});

        service.getHierarchy('a-uuid').then(function(response) {
            expect(response.data).toEqual({uuid: 'hierarchy-id'});
        });

        $httpBackend.flush();
    });

    it('locationHierarchies should be memoized', function() {
        service.hierarchies = hierarchyMap;

        service.locationHierarchies(function(hierarchies) {
            expect(hierarchyMap).toEqual(hierarchies);
        });

    });

});
