'use strict';

describe('my app', function() {

    it('Filling out new location form creates new location', function () {
        browser.get('/app#/form/location');
        expect(browser.getLocationAbsUrl()).toMatch('/form/location');

        var parentName = element(by.css('parentLocationHierarchy.name'));
        expect(parentName).toBeDefined();

        var locationName = element(by.css('locationName'))
        expect(locationName).toBeDefined();
    });
});
