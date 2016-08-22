"use strict";
describe('DeathController', function() {
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
            currentVisit: {
                activeIndividual: {
                    uuid: {
                        uuid: "abc-123"
                    }
                }
            },
            handleNextUpdate: function() {},
            validateUser: function() {return true;}
        };

        $locationMock = jasmine.createSpyObj('$location', ['url']);
        spyOn(AppStateMock, 'handleNextUpdate');

        controller = $controller('DeathController',
            {   AppState: AppStateMock,
                $location: $locationMock
            });
    }));

    describe('DeathController', function() {
        it('initializes', function() {
            expect(controller).toEqual(jasmine.anything());
        });

        it('submits location then redirects to social group page', function() {
            $httpBackend.expectPOST("/api/death",
                                    {visit: "visit-id",
                                     individual: "individual-id",
                                     deathPlace: "some-place",
                                     deathCause: "doom",
                                     deathDate: "2010-01-01",
                                     collectionDateTime: controller.date,
                                     collectedByUuid: 123}
                                   ).respond("123-456");

            controller.visit = "visit-id";
            controller.individual = "individual-id";
            controller.deathPlace = "some-place";
            controller.deathCause = "doom";
            controller.deathDate = "2010-01-01";
            controller.create(true);
            $httpBackend.flush();

            expect(AppStateMock.handleNextUpdate).toHaveBeenCalled();
        });
    });
});
