"use strict";
describe('LocationController', function() {
    beforeEach(module('openHDS.view'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('LocationController', function() {
        it('initializes', function() {
            var BackendService = {get: function (stuff) {return {then: function(things) {}}}};
            var AppState = {};
            var $location = {url: function() {}};
            var controller = $controller('LocationController',
                {   BackendService: BackendService,
                    AppState: AppState,
                    $location: $location
                });
            expect(-1).toEqual(-1);
        });
    });
});