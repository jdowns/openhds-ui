"use strict";
describe('IndividualController', function() {
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
            location: 1234,
            socialGroup: 2345,
            genderCodes: ["foo"],
            loadData: function() {}
        };

        spyOn(AppStateMock, 'loadData');

        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('IndividualController',
            {   BackendService: BackendServiceMock,
                AppState: AppStateMock,
                $location: $locationMock
            });
    }));

    describe('IndividualController', function() {

        it('submits single individual then redirects to relationship page', function() {
            var expectedResponse = {data: "individual-uuid"};
            controller.firstName = "test";
            controller.extId = "test";
            controller.gender = "foo";

            withMockPromiseResolved(BackendServiceMock.post, expectedResponse, function() {
                controller.create(true);
            }, q, rootScope);
            expect(AppStateMock.individual).toEqual(["individual-uuid"]);
            expect($locationMock.url).toHaveBeenCalledWith("/relationship/new");
            expect(BackendServiceMock.post).toHaveBeenCalledWith("/individual",
                {
                    individual: {firstName: "test", extId: "test", gender: "foo", collectionDateTime: controller.date},
                    collectedByUuid: 123
                });
        });

        it('submits two individuals with more to come, then no redirects to relationship page', function() {
            var expectedResponse = {data: "individual-uuid"};
            controller.firstName = "test";
            controller.extId = "test";
            controller.gender = "foo";
            controller.areMoreIndividuals = true;
            controller.residencyStartDate = '2000-01-01';
            controller.residencyStartType = 'foo';
            controller.membershipStartType = 'bar';
            controller.membershipStartDate = '2001-01-01';

            withMockPromiseResolved(BackendServiceMock.post, expectedResponse, function() {
                controller.create(true);
            }, q, rootScope);
            withMockPromiseResolved(BackendServiceMock.post, expectedResponse, function() {
                controller.create(true);
            }, q, rootScope);
            expect(AppStateMock.individual).toEqual(["individual-uuid","individual-uuid"]);
            expect($locationMock.url.calls.count()).toEqual(0);
            expect(BackendServiceMock.post).toHaveBeenCalledWith("/individual",
                {
                    individual: {firstName: "test", extId: "test", gender: "foo", collectionDateTime: controller.date},
                    collectedByUuid: 123
                });
            expect(BackendServiceMock.post).toHaveBeenCalledWith("/residency", {
                residency:
                {
                    individual: 'individual-uuid',
                    location: AppStateMock.location,
                    startType: 'foo',
                    startDate: '2000-01-01',
                    collectionDateTime: controller.date},
                collectedByUuid: 123});
            expect(BackendServiceMock.post).toHaveBeenCalledWith("/membership",
                {
                    membership:
                    {
                        individual: 'individual-uuid',
                        socialGroup: AppStateMock.socialGroup,
                        startType: 'bar',
                        startDate: '2001-01-01',
                        collectionDateTime: controller.date},
                    collectedByUuid: 123});
        });
    });
});