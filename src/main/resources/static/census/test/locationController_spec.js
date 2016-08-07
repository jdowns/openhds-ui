"use strict";
describe('LocationController', function() {
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

        BackendServiceMock = jasmine.createSpyObj('BackendService', ['post']);
        AppStateMock = {
            user: {isSupervisor: true, userId: 123},
            loadData: function() {}
        };

        spyOn(AppStateMock, 'loadData');

        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('LocationController',
            {   BackendService: BackendServiceMock,
                AppState: AppStateMock,
                $location: $locationMock
            });
    }));

    describe('LocationController', function() {
        it('initializes', function() {
            expect(controller).toEqual(jasmine.anything());
        });

        it('loads project codes and location hierarchies', function() {
            controller.loadData();
            expect(AppStateMock.loadData).toHaveBeenCalled();
        });

        it('submits location then redirects to social group page', function() {
            var expectedResponse = {data: "location-uuid"};
            controller.name = "test";
            controller.extId = "test";
            controller.type = "foo";
            
            withMockPromiseResolved(BackendServiceMock.post, expectedResponse, function() {
                controller.create(true);
            }, q, rootScope);
            expect(AppStateMock.location).toEqual("location-uuid");
            expect($locationMock.url).toHaveBeenCalledWith("/socialGroup/new");
            expect(BackendServiceMock.post).toHaveBeenCalledWith("/location",
                {
                    location: {name: "test", extId: "test", type: "foo", collectionDateTime: controller.date},
                    collectedByUuid: 123
                });
        });
    });
});