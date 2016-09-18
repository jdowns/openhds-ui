"use strict";
describe('LocationController', function() {
    var $controller;
    var controller;

    var AppStateMock;
    var $locationMock;
    var $httpBackend;

    beforeEach(module('openHDS.view'));

    beforeEach(inject(function(_$controller_, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;

        AppStateMock = {
            user: {isSupervisor: true, userId: 123},
            validateUser: function() {}
        };

        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('LocationController', {
            AppState: AppStateMock,
            $location: $locationMock
        });

    }));

    function loadLocationHierarchies () {
        controller.locationHierarchies = {
                "": [{"name": "hierarchy-root",
                      "uuid": "HIERARCHY_ROOT",
                      "extId": "hierarchy-root"}],
                "b88430c5-0f38-429c-b54d-c3ad4852c146": [
                    {"name": "hierarchy-0-1-1",
                     "uuid": "5d19cb44-2b75-4182-9451-09f6ae90c994",
                     "extId": "hierarchy-0-1-1"},
                    {"name": "hierarchy-0-1-2",
                     "uuid": "ac9b9981-e647-4bee-bcbe-01b4da1ddf82",
                     "extId": "hierarchy-0-1-2"}],
                "HIERARCHY_ROOT": [
                    {"name": "hierarchy-0",
                     "uuid": "7a059edb-97ba-4a2a-9ea6-2a8677b75046",
                     "extId": "hierarchy-0"},
                    {"name": "UNKNOWN_STATUS",
                     "uuid": "UNKNOWN",
                     "extId": "UNKNOWN_STATUS"}],
                "7a059edb-97ba-4a2a-9ea6-2a8677b75046": [
                    {"name": "hierarchy-0-1",
                     "uuid": "b88430c5-0f38-429c-b54d-c3ad4852c146",
                     "extId": "hierarchy-0-1"},
                    {"name": "hierarchy-0-2",
                     "uuid": "2f11e309-12f8-4451-9d33-41e7018ec4c1",
                     "extId": "hierarchy-0-2"}]};
    }

    describe('LocationController', function() {
        it('update root hierarchy initializes hierarchies', function() {
            loadLocationHierarchies();
            controller.selectedRootHierarchy = "HIERARCHY_ROOT";
            controller.updateRootHierarchy();

            expect(controller.locationPath).toEqual(["HIERARCHY_ROOT"]);
        });

        it('update hierarchy stops adding to the path if selected hierarchy not found', function() {
            var initialHierarchies = ["h1", "h2", "h3"];
            controller.locationHierarchies = {};
            controller.locationPath = ["root"];
            controller.hierarchies = initialHierarchies;
            controller.updateHierarchy("h4");
            expect(controller.hierarchies).toEqual(initialHierarchies);
        });

        it('update hierarchy selects correct hierarchy', function() {
            var nextUuid =  '7a059edb-97ba-4a2a-9ea6-2a8677b75046';
            loadLocationHierarchies();
            controller.selectedRootHierarchy = "HIERARCHY_ROOT";
            controller.updateRootHierarchy();
            controller.locationPath[1] = nextUuid;
            controller.updateHierarchy(1);

            var expected = controller.locationHierarchies[nextUuid];
            var actual = controller.hierarchiesByLevel.pop();

            expect(expected).toEqual(actual);
        });

        it('loads project codes and location hierarchies', function() {
            $httpBackend.expectGET('/api/locationHierarchyLevel').respond("levels");
            $httpBackend.expectGET('/api/locationHierarchy').respond("hierarchies");
            $httpBackend.expectGET('/api/projectcode/locationType').respond("codes");
            controller.loadData();
            $httpBackend.flush();

            expect(controller.codes).toEqual("codes");
            expect(controller.locationHierarchies).toEqual("hierarchies");
            expect(controller.hierarchyLevels).toEqual("levels");
        });

        it('submits location then redirects to social group page', function() {
            $httpBackend.expectPOST("/api/location", {name: "test",
                                                      extId: "test",
                                                      type: "foo",
                                                      locationHierarchyUuid: "uuid-2",
                                                      collectionDateTime: controller.date,
                                                      collectedByUuid: 123
                                                     }
                                   ).respond("123-456");

            controller.name = "test";
            controller.extId = "test";
            controller.type = "foo";
            controller.locationPath = ["uuid-1", "uuid-2"];
            controller.create(true);
            $httpBackend.flush();

            expect(AppStateMock.location).toEqual("123-456");
            expect($locationMock.url).toHaveBeenCalledWith('/socialGroup/new');
        });
    });
});
