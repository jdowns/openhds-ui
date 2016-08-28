"use strict";
describe('InMigrationController', function () {
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

        controller = $controller('InMigrationController',
            {
                AppState: AppStateMock,
                $location: $locationMock
            });
        spyOn(AppStateMock, 'handleNextUpdate');
    }));

    it('initializes', function() {
        $httpBackend.expectGET('/api/projectcode/gender').respond(["a", "b"]);
        controller.loadData();
        $httpBackend.flush();
        expect(controller.codes).toEqual(["a", "b"]);
    });

    it('submits new in migration and continues to next udpate',
       function () {
           $httpBackend.expectPOST('/api/individual').respond('individual-id');
           $httpBackend.expectPOST('/api/inMigration').respond("inmigration-id");
           controller.areMoreIndividuals = false;
           controller.create();
           $httpBackend.flush();

           expect($locationMock.url).toHaveBeenCalledWith("/visit");
       });
    it('submits new in migration and presents form again',
       function () {
           $httpBackend.expectPOST('/api/individual').respond('individual-id');
           $httpBackend.expectPOST('/api/inMigration').respond("inmigration-id");
           controller.areMoreIndividuals = true;
           controller.create();
           $httpBackend.flush();

           expect($locationMock.url).toHaveBeenCalledWith("/visit/inMigration");
       });
});
