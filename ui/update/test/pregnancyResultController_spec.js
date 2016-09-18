"use strict";
describe('PregnancyResultController', function () {
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
            loadData: function () {},
            currentVisit: {activeIndividual: {uuid: "ind-a"},
                           pregnancyOutcome: "outcome-id"},
            handleNextUpdate: function(r) {}
        };

        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('PregnancyResultController',
            {
                AppState: AppStateMock,
                $location: $locationMock
            });
        spyOn(AppStateMock, 'handleNextUpdate');
    }));

    it('initializes', function() {
        $httpBackend.expectGET("/api/projectcode/pregnancyResultType")
            .respond(["t1", "t2"]);
        $httpBackend.expectGET("/api/projectcode/gender")
            .respond(["g1", "g2"]);

        controller.loadData();
        $httpBackend.flush();

        expect(controller.codes).toEqual(["t1", "t2"]);
        expect(controller.genderCodes).toEqual(["g1", "g2"]);
    });

    it('submits new pregnancy result and calls next update', function () {
        $httpBackend.expectPOST('/api/pregnancyResult').respond("foo");
        controller.create();
        $httpBackend.flush();

        expect(AppStateMock.handleNextUpdate).toHaveBeenCalled();
    });
});
