"use strict";
describe('LocationController', function() {
    beforeEach(module('openHDS.view'));

    var $controller;
    var controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
        var BackendServiceMock = {};
        var AppStateMock = {};
        var $locationMock = {url: function() {}};
        controller = $controller('LocationController',
            {   BackendService: BackendServiceMock,
                AppState: AppStateMock,
                $location: $locationMock
            });
    }));

    describe('LocationController', function() {
        it('initializes', function() {
            expect(controller).toEqual(jasmine.anything());
        });
    });
});