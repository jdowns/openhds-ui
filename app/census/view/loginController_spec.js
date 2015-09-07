'use strict';

describe("Login Controller", function() {
    var locationController;
    beforeEach(module('openHDS.view'));
    beforeEach(inject(function($controller) {
        locationController = $controller('LoginController', {
            $scope: {}
        })
    }));

    it('should be defined', function() {
        expect(locationController).toBeDefined();
    })
});