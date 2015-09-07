'use strict';

function mockFieldWorkerService() {
    return {
        authorize: function (a, b) {
        },
        authorized: function () {
            return true;
        },
        currentFieldWorker: function () {
            return "acbd";
        }
    };
}

describe("Login Controller", function() {
    var locationController;
    beforeEach(module('openHDS.view'));
    beforeEach(inject(function($controller) {
        locationController = $controller('LoginController', {
            $scope: {},
            FieldWorkerService: mockFieldWorkerService
        })
    }));

    it('should be defined', function() {
        expect(locationController).toBeDefined();
    })
});