"use strict";

describe('BaselineController', function() {

    var $controller,
        controller,
        $location,
        $httpBackend;

    beforeEach(module('openHDS.baseline'));

    beforeEach(inject(function(_$controller_, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
        $location = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('BaselineController', {

        });
    }));

    it('exists', function() {
        expect(controller).toBeDefined();
    });
});
