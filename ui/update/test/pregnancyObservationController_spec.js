"use strict";
describe('PregnancyObservationController', function () {
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

        controller = $controller('PregnancyObservationController',
            {
                AppState: AppStateMock,
                $location: $locationMock
            });
        spyOn(AppStateMock, 'handleNextUpdate');
    }));

    it('submits new pregnancy observation and continues to next udpate',
       function () {
           $httpBackend.expectPOST('/api/pregnancyObservation').respond("obs-id");
           controller.create();
           $httpBackend.flush();

           expect(AppStateMock.handleNextUpdate).toHaveBeenCalled();
    });
});
