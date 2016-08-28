"use strict";

describe('VisitEventsController', function() {
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
            user: {isSupervisor: false, userId: 123},
            validateUser: function() {},
            loadData: function(){},
            handleNextUpdate: function() {}
        };

        $locationMock = jasmine.createSpyObj('$location', ['url']);
        spyOn(AppStateMock, 'handleNextUpdate');
        controller = $controller('VisitEventsController', {
            AppState: AppStateMock,
            $location: $locationMock
        });
    }));

    it('initializes', function() {
        AppStateMock.currentVisit = {visitId: "visit-id",
                                     locationId: "loc-id",
                                     individuals: ['ind-a', 'ind-b']};
        controller.loadData();
        expect(AppStateMock.currentVisit.individuals).toEqual(['ind-b']);
        expect(AppStateMock.currentVisit.activeIndividual).toEqual({uuid: "ind-a", updates: []});
    });

    it('returns to new visit when all individuals are processed', function() {
        AppStateMock.currentVisit = {visitId: "visit-id",
                                 locationId: "loc-id",
                                 individuals: []};
        controller.loadData();
        expect($locationMock.url).toHaveBeenCalledWith('/visit/new');
    });

    it('creates a queue of update events', function() {
        AppStateMock.currentVisit = {visitId: "visit-id",
                                     locationId: "loc-id",
                                     individuals: ['ind-a', 'ind-b']};
        controller.loadData();
        expect(AppStateMock.currentVisit.individuals).toEqual(['ind-b']);
        expect(AppStateMock.currentVisit.activeIndividual).toEqual({uuid: "ind-a", updates: []});

        controller.updateEvents = {outMigration: false,
                                   death: true,
                                   pregnancyObservation: true,
                                   pregnancyOutcome: true};
        controller.create();
        expect(AppStateMock.currentVisit.activeIndividual.updates).toEqual(["death", "pregnancyObservation", "pregnancyOutcome"]);
        expect(AppStateMock.handleNextUpdate).toHaveBeenCalled();
    });

    it('only creates specified update events', function() {
        AppStateMock.currentVisit = {visitId: "visit-id",
                                     locationId: "loc-id",
                                     individuals: ['ind-a', 'ind-b']};
        controller.loadData();
        expect(AppStateMock.currentVisit.individuals).toEqual(['ind-b']);
        expect(AppStateMock.currentVisit.activeIndividual).toEqual({uuid: "ind-a", updates: []});

        controller.updateEvents = {outMigration: true,
                                   death: false,
                                   pregnancyObservation: false,
                                   pregnancyOutcome: false};
        controller.create();
        expect(AppStateMock.currentVisit.activeIndividual.updates).toEqual(["outMigration"]);
        expect(AppStateMock.handleNextUpdate).toHaveBeenCalled();

    });

});
