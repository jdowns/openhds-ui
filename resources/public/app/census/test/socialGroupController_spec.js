"use strict";
describe('SocialGroupController', function() {
    var $controller;
    var controller;

    var BackendServiceMock;
    var AppStateMock;
    var $locationMock;

    beforeEach(module('openHDS.view'));

    beforeEach(inject(function($q, $rootScope, _$controller_) {
        $controller = _$controller_;
        q = $q;
        rootScope = $rootScope;

        BackendServiceMock = jasmine.createSpyObj('BackendService', ['get', 'post']);
        AppStateMock = {
            user: {isSupervisor: true, userId: 123},
            groupTypeCodes: ["foo"],
            loadData: function() {}
        };

        spyOn(AppStateMock, 'loadData');

        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('SocialGroupController',
            {   BackendService: BackendServiceMock,
                AppState: AppStateMock,
                $location: $locationMock
            });
    }));

    describe('SocialGroupController', function() {
        /*
        it('initializes', function() {
            expect(controller).toEqual(jasmine.anything());
        });

        it('submits location then redirects to social group page', function() {
            var expectedResponse = {data: "group-uuid"};
            controller.groupName = "test";
            controller.extId = "test";
            controller.groupType = "foo";

            withMockPromiseResolved(BackendServiceMock.post, expectedResponse, function() {
                controller.create(true);
            }, q, rootScope);
            expect(AppStateMock.socialGroup).toEqual("group-uuid");
            expect($locationMock.url).toHaveBeenCalledWith("/individual/new");
            expect(BackendServiceMock.post).toHaveBeenCalledWith("/socialGroup",
                {
                    socialGroup: {groupName: "test", extId: "test", groupType: "foo", collectionDateTime: controller.date},
                    collectedByUuid: 123
                });
        });
*/
    });
});
