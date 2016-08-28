"use strict";
describe('PregnancyOutcomeController', function () {
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
            currentVisit: {activeIndividual: {uuid: "ind-a"}},
            handleNextUpdate: function(r) {}
        };

        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('PregnancyOutcomeController',
            {
                AppState: AppStateMock,
                $location: $locationMock
            });
    }));

    it('submits new pregnancy outcome and forwards to pregnancy result',
       function () {
           $httpBackend.expectPOST('/api/pregnancyOutcome').respond("outcome-id");
           controller.create();
           $httpBackend.flush();

           expect(AppStateMock.currentVisit.pregnancyOutcome).toEqual("outcome-id");
           expect($locationMock.url).toHaveBeenCalledWith("/visit/pregnancyResult");
    });
});
