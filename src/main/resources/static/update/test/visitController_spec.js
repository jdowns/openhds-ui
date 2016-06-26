"use strict";
describe('VisitController', function () {
    var $controller;
    var controller;

    var BackendServiceMock;
    var AppStateMock;
    var $locationMock;

    beforeEach(module('openHDS.view'));

    beforeEach(inject(function ($q, $rootScope, _$controller_) {
        $controller = _$controller_;
        q = $q;
        rootScope = $rootScope;

        BackendServiceMock = jasmine.createSpyObj('BackendService', ['post', 'get']);
        AppStateMock = {
            user: {isSupervisor: true, userId: 123},
            loadData: function () {
            }
        };

        spyOn(AppStateMock, 'loadData');

        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('VisitController',
            {
                BackendService: BackendServiceMock,
                AppState: AppStateMock,
                $location: $locationMock
            });
    }));

    it('submits new visit and gets individuals for update', function () {
        var expectedResponse = {data: "location-uuid"};
        controller.name = "test";
        controller.location = "testloc";
        controller.visitDate = "2016-06-20";
        controller.extId = "test";
        controller.type = "foo";

        withMockPromiseResolved(BackendServiceMock.post, expectedResponse, function () {
            withMockPromiseResolved(BackendServiceMock.get, {}, function () {
                controller.create(true);
            }, q, rootScope);
        }, q, rootScope);
        expect($locationMock.url).toHaveBeenCalledWith("/visit");
        expect(BackendServiceMock.post).toHaveBeenCalledWith("/visit",
            {
                visit: {
                    extId: "test",
                    location: "testloc",
                    visitDate: "2016-06-20",
                    collectionDateTime: controller.date
                },
                collectedByUuid: 123});
    });
});