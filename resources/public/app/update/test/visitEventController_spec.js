"use strict";

describe('VisitEventController', function() {
    var $controller;
    var controller;
    var AppStateMock;
    var $locationMock;
    var $httpBackend;

    beforeEach(module('openHDS.view'));

    beforeEach(inject(function ($rootScope, _$controller_, $httpBackend_) {
        $httpBackend = _$httpBackend_;
        $controller = $_controller_;
        AppStateMock = {
            user: {isSupervisor: false, userId: 123},
            loadData: function(){}
        };

        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('VisitEventController', {
            AppState: AppStateMock,
            $location: $locationMock
        });
    }));

    it('creates a queue of update events', function() {

    });

});
