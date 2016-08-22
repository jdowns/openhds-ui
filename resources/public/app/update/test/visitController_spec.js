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

        $httpBackend.expectGET('/api/individual/testloc')
            .respond('some individuals...');

        controller.name = "test";
        controller.location = "testloc";
        controller.visitDate = "2016-06-20";
        controller.extId = "test";
        controller.type = "foo";

        controller.create(true);
        $httpBackend.flush();
        expect(AppStateMock.currentVisit.visitId).toEqual("123");
        expect($locationMock.url).toHaveBeenCalledWith("/visit");

    });
});
