'use strict';

describe('Navigation Service', function() {
    var $location;
    var NavigationService;

    beforeEach(module('openHDS.core'));
    beforeEach(inject(function(_$location_, _NavigationService_) {
        $location = _$location_;
        NavigationService = _NavigationService_;
    }));

    it ("should go to /home", function() {
        NavigationService.returnToDashboard();
        expect($location.path()).toBe('/home');
    });

    it ("should go to /census", function() {
        NavigationService.startCensus();
        expect($location.path()).toBe('/census');
    });

    it ("should go to /location/new", function() {
        NavigationService.startNewLocation();
        expect($location.path()).toBe('/location/new');
    });

    it ("should go to /individual/new", function() {
        NavigationService.startNewIndividual();
        expect($location.path()).toBe('/individual/new');
    });
});