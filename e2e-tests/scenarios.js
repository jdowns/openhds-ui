'use strict';

describe('OpenHDS: ', function() {

    it('User is able to create a new location with a single resident', function () {
        browser.get('/app');

        var dashboardPage = new DashboardPage();
        dashboardPage.validate();

        var newLocationPage = dashboardPage.createNewLocation();

        newLocationPage.validate();
        newLocationPage.fill('UnitTestLand', 'Urban', '0.0', '0.0', '0.0', '0.0', 'fieldWorker');
        var individualPage = newLocationPage.submit();

        individualPage.validate();
        individualPage.fill("john", "a.", "smith", "9/1/1980", "suzie a. smith", "john b. smith");
        expect(individualPage.fieldWorkerId.getAttribute('value')).toBe("fieldWorker");
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
    this.newLocationButton = getElement('new-location');

    this.validate = function() {
        expect(browser.getLocationAbsUrl()).toEqual('/dashboard');
        expect(this.newLocationButton).toBeDefined();
    };

    this.createNewLocation = function() {
        this.newLocationButton.click();
        return new NewLocationPage();
    }
}


