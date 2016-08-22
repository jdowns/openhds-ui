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
            loadData: function(){}
        };

        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('VisitEventsController', {
            AppState: AppStateMock,
            $location: $locationMock
        });
    }));

    it('creates a queue of update events', function() {

    });

});
