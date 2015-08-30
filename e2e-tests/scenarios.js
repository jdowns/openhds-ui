'use strict';

describe('OpenHDS workflows ', function() {

    it('Allows a user to create a new location with an individual', function () {
        browser.get('/app');

        var dashboardPage = new DashboardPage();
        dashboardPage.validate();
        dashboardPage.setFieldWorkerId('field-worker');
        expect(dashboardPage.fieldWorker.getAttribute('value')).toBe('field-worker');

        var newLocationPage = dashboardPage.createNewLocation();

        newLocationPage.validate();
        newLocationPage.fill('UnitTestLand', 'Urban', '0.0', '0.0', '0.0', '0.0');
        var individualPage = newLocationPage.submit();

        individualPage.validate();
        individualPage.fill("john", "a.", "smith", "9/1/1980", "suzie a. smith", "john b. smith");
        expect(individualPage.fieldWorkerId.getAttribute('value')).toBe("field-worker");
        dashboardPage = individualPage.submit();

        dashboardPage.validate();
    });

});

function expectNotNull(element) {
    expect(element).not.toBeNull();
}

function getElement(id) {
    return element(by.id(id));
}

function NewLocationPage() {
    this.locationName = getElement('locationName-input');
    this.locationType = getElement('locationType');
    this.latitude = getElement('latitude-input');
    this.longitude = getElement('longitude-input');
    this.altitude = getElement('altitude-input');
    this.accuracy = getElement('accuracy-input');
    this.fieldWorker = getElement('fieldWorkerId-input');
    this.createButton = getElement('createButton');
    this.cancelButton = getElement('cancelButton');

    this.validate = function() {
        expect(browser.getLocationAbsUrl()).toEqual('/location/new')
        expectNotNull(this.locationName);
        expectNotNull(this.locationType);
        expectNotNull(this.latitude);
        expectNotNull(this.longitude);
        expectNotNull(this.altitude);
        expectNotNull(this.accuracy);
        expectNotNull(this.fieldWorker);
        expectNotNull(this.createButton);
        expectNotNull(this.cancelButton);
    };

    this.fill = function(locationName, locationType,
                         latitude, longitude, altitude, accuracy) {
        this.locationName.sendKeys(locationName);
        element(by.cssContainingText('option', locationType)).click();
        this.latitude.sendKeys(latitude);
        this.longitude.sendKeys(longitude);
        this.altitude.sendKeys(altitude);
        this.accuracy.sendKeys(accuracy);
    };

    this.submit = function() {
        this.createButton.click();
        return new NewIndividualPage();
    }
}

function NewIndividualPage() {
    this.firstName = getElement('firstName');
    this.middleName = getElement('middleName');
    this.lastName = getElement('lastName');
    this.dateOfBirth = getElement('dateOfBirth');
    this.mother = getElement('mother');
    this.father = getElement('father');
    this.relationships = getElement('relationships');
    this.fieldWorkerId = getElement('fieldWorkerId-input');
    this.submitForm = getElement('submit');

    this.validate = function() {
        expect(browser.getLocationAbsUrl()).toEqual('/individual/new');
        expectNotNull(this.firstName);
        expectNotNull(this.middleName);
        expectNotNull(this.lastName);
        expectNotNull(this.dateOfBirth);
        expectNotNull(this.mother);
        expectNotNull(this.father);
        expectNotNull(this.relationships);
        expectNotNull(this.fieldWorkerId);
    };

    this.fill = function(firstName, middleName, lastName, dateOfBirth, mother, father, relationships) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.mother = mother;
        this.father = father;
        this.relationships = relationships;
    };

    this.submit = function() {
        this.submitForm.click();
        return new DashboardPage();
    }
}

function DashboardPage() {
    this.fieldWorker = getElement('fieldWorkerId-input');
    this.newLocationButton = getElement('new-location');

    this.validate = function() {
        expect(browser.getLocationAbsUrl()).toEqual('/dashboard');
        expect(this.newLocationButton).toBeDefined();
    };

    this.createNewLocation = function() {
        this.newLocationButton.click();
        return new NewLocationPage();
    };

    this.setFieldWorkerId = function(fieldWorkerName) {
        this.fieldWorker.clear();
        this.fieldWorker.sendKeys(fieldWorkerName);
    }
}


