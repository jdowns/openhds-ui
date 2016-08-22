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
            user: {isSupervisor: true, userId: 123}
        };

        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('LocationController',
            {   AppState: AppStateMock,
                $location: $locationMock
            });
    }));

    describe('LocationController', function() {
        it('initializes', function() {
            expect(controller).toEqual(jasmine.anything());
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
