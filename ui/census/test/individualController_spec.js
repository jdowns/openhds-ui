"use strict";
describe('IndividualController', function() {
    var $controller;
    var controller;

    var AppStateMock;
    var $locationMock;

    var $httpBackend;

    beforeEach(module('openHDS.view'));

    beforeEach(inject(function(_$httpBackend_) {
        $httpBackend = _$httpBackend_;
    }));

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;

        AppStateMock = {
            user: {isSupervisor: true, userId: 123},
            validateUser: function() {},
            location: 1234,
            socialGroup: 2345,
            genderCodes: ["foo"],
            loadData: function() {}
        };

        spyOn(AppStateMock, 'loadData');

        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('IndividualController',
            {
                AppState: AppStateMock,
                $location: $locationMock
            });
    }));

    describe('IndividualController', function() {

        it('initializes correctly', function() {
            expect(controller.collectedByUuid).toBe(123);
            expect(controller.areMoreIndividuals).toBe(false);
            expect(controller.location).toBe(1234);

            $httpBackend.expectGET('/api/projectcode/gender').respond(["male", "female"]);
            $httpBackend.expectGET('/api/projectcode/membershipType').respond(["born", "married"]);
            $httpBackend.expectGET('/api/projectcode/migrationType').respond(["born", "moved"]);

            controller.loadData();
            $httpBackend.flush();

            expect(controller.codes).toEqual(["male", "female"]);
            expect(controller.membershipCodes).toEqual(['born', 'married']);
            expect(controller.residencyCodes).toEqual(['born', 'moved']);

        });

        it('submits single individual then redirects to relationship page', function() {
            $httpBackend.expectPOST('/api/individual',
                                    {firstName: "test",
                                     extId: "test",
                                     gender: "foo",
                                     collectionDateTime: controller.date,
                                     collectedByUuid: 123,
                                     location: 1234 }).respond("individual-uuid");
            $httpBackend.expectPOST('/api/residency',
                                    {individual: "individual-uuid",
                                     location: 1234,
                                     collectionDateTime: controller.date,
                                     collectedByUuid:123}).respond("1234");
            $httpBackend.expectPOST('/api/membership',
                                    {individual: "individual-uuid",
                                     socialGroup:2345,
                                     collectionDateTime: controller.date,
                                     collectedByUuid:123}).respond("1234");

            controller.firstName = "test";
            controller.extId = "test";
            controller.gender = "foo";

            controller.create(true);
            $httpBackend.flush();

            expect(AppStateMock.individual).toEqual(["individual-uuid"]);
            expect($locationMock.url).toHaveBeenCalledWith("/relationship/new");
        });

        it('submits two individuals with more to come, then no redirects to relationship page', function() {

            var form = {firstName: 'test',
                        extId: 'test',
                        gender: 'foo',
                        areMoreIndividuals: true,
                        residencyStartDate: '2000-01-01',
                        residencyStartType: 'foo',
                        membershipStartType: 'bar',
                        membershipStartDate: '2001-01-01'
                       };

            for (var attrname in form) {
                controller[attrname] = form[attrname];
            }

            var individual =
                    {firstName: "test",
                     extId: "test",
                     gender: "foo",
                     collectionDateTime: controller.date,
                     collectedByUuid: 123,
                     location: 1234};

            var residency =
                    {individual: "individual-uuid",
                     location: 1234,
                     startType: 'foo',
                     startDate: '2000-01-01',
                     collectionDateTime: controller.date,
                     collectedByUuid:123};

            var membership =
                    {individual: "individual-uuid",
                     socialGroup:2345,
                     startType: 'bar',
                     startDate: '2001-01-01',
                     collectionDateTime: controller.date,
                     collectedByUuid:123};

            $httpBackend.expectPOST('/api/individual', individual)
                .respond("individual-uuid");
            $httpBackend.expectPOST('/api/residency', residency)
                .respond("1234");
            $httpBackend.expectPOST('/api/membership', membership)
                .respond("1234");

            controller.create(true);
            $httpBackend.flush();

            $httpBackend.expectPOST('/api/individual', individual)
                .respond("individual-uuid");
            $httpBackend.expectPOST('/api/residency', residency)
                .respond("1234");
            $httpBackend.expectPOST('/api/membership', membership)
                .respond("1234");

            controller.create(true);
            $httpBackend.flush();

            expect(AppStateMock.individual).toEqual(["individual-uuid","individual-uuid"]);
            expect($locationMock.url.calls.count()).toEqual(0);

        });
    });
});
