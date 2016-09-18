"use strict";
describe('VisitController', function () {
    var $controller;
    var controller;
    var AppStateMock;
    var $locationMock;
    var $httpBackend;

    beforeEach(module('openHDS.view'));

    beforeEach(inject(function (_$controller_, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;

        AppStateMock = {
            user: {isSupervisor: true, userId: 123},
            validateUser: function() {},
            loadData: function () {
            }
        };

        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('VisitController',
            {
                AppState: AppStateMock,
                $location: $locationMock
            });
    }));

    it('initializes', function() {
        $httpBackend.expectGET('/api/location').respond(["location1", "location2"]);
        controller.loadData();
        $httpBackend.flush();
        expect(controller.locations).toEqual(["location1", "location2"]);
    });

    it('navigates to inMigration page if inMigrations is set', function() {
        controller.inMigrations = true;
        controller.location = '123';
        $httpBackend.expectPOST('/api/visit').respond('visit-id');
        $httpBackend.expectGET('/api/individual/byLocation/123').respond('individual-id');
        controller.create();
        $httpBackend.flush();
        expect($locationMock.url).toHaveBeenCalledWith('/visit/inMigration');
    });

    it('submits new visit and gets individuals for update', function () {
        var expectedResponse = {data: "location-uuid"};
        $httpBackend.expectPOST('/api/visit',
                                {
                                    extId:"test",
                                    location: "testloc",
                                    visitDate:"2016-06-20",
                                    collectionDateTime: controller.date,
                                    collectedByUuid:123
                                }).respond("123");

        $httpBackend.expectGET('/api/individual/byLocation/testloc')
            .respond('some individuals...');

        controller.name = "test";
        controller.location = "testloc";
        controller.visitDate = "2016-06-20";
        controller.extId = "test";
        controller.type = "foo";

        controller.create();
        $httpBackend.flush();
        expect(AppStateMock.currentVisit.visitId).toEqual("123");
        expect($locationMock.url).toHaveBeenCalledWith("/visit");

    });
});
