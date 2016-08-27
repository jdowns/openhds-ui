"use strict";
describe('SocialGroupController', function() {
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
            groupTypeCodes: ["foo"],
            loadData: function() {},
            validateUser: function() {}
        };

        spyOn(AppStateMock, 'loadData');

        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('SocialGroupController',
            {
                AppState: AppStateMock,
                $location: $locationMock
            });
    }));

    describe('SocialGroupController', function() {

        it('initializes', function() {
            $httpBackend.expectGET('/api/projectcode/socialGroupType').respond(
                ["a", "b"]);
            controller.loadData();
            $httpBackend.flush();
            expect(controller.codes).toEqual(["a", "b"]);
        });

        it('submits location then redirects to social group page', function() {
            $httpBackend.expectPOST("/api/socialgroup",
                                    {groupName: "test",
                                     extId: "test",
                                     groupType: "foo",
                                     collectionDateTime: controller.date,
                                     collectedByUuid: 123}).respond("group-uuid");

            var expectedResponse = {data: "group-uuid"};
            controller.groupName = "test";
            controller.extId = "test";
            controller.groupType = "foo";

            controller.create(true);
            $httpBackend.flush();

            expect(AppStateMock.socialGroup).toEqual("group-uuid");
            expect($locationMock.url).toHaveBeenCalledWith("/individual/new");
        });

    });
});
