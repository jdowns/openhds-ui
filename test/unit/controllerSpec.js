'use strict';

describe('LocationCtrl', function() {

    var scope, ctrl, coords;

    function geoCallback(pos) {
        coords = pos.coords;
        it('should have latitude', function() {
            expect(scope.latitude).toEqual(coords.latitude);
        });

        it('should have longitude', function() {
            expect(scope.longitude).toEqual(coords.longitude);
        });

        it('should have accuracy', function() {
            expect(scope.accuracy).toEqual(coords.accuracy);
        });

        it('should have altitude', function() {
            expect(scope.altitude).toEqual(coords.altitude);
        });
    }

    navigator.geolocation.getCurrentPosition(geoCallback);

    beforeEach(module('openhds'));

    beforeEach(inject(function($controller) {
        scope = {};
        ctrl = $controller('LocationCtrl', {$scope: scope});
    }))

    it('should have a location hierarchy', function() {
        expect(scope.locationHierarchy).toEqual([]);
    });

    it('should have a location name', function() {
        expect(scope.locationName).toEqual('');
    });

    it('should have a location type', function() {
        expect(scope.locationType).toEqual('rural');
    });

    it('should have field worker ID', function() {
        expect(scope.fieldWorkerId).toEqual(null);
    });

    it('should have an init function', function() {
        expect(scope.init()).toBe(1);
    });

});
