'use strict';

describe('OpenHDS: ', function() {

    it('User is able to login and create a new location', function () {
        browser.get('/app');
        var loginPage = new LoginPage();
        loginPage.validate();
        var dashboardPage = loginPage.login('user', 'password', 'https://arcane-lake-8447.herokuapp.com/')

        dashboardPage.validate();

        var newLocationPage = dashboardPage.createNewLocation();

        newLocationPage.validate();
        newLocationPage.fill('UnitTestLand', 'Urban', '0.0', '0.0', '0.0', '0.0', 'abc123');
        var individualPage = newLocationPage.submit();

        individualPage.validate();
        individualPage.fill("john", "a.", "smith", "9/1/1980", "suzie a. smith", "john b. smith", "");
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

function LoginPage() {
    this.usernameTextbox = getElement('username');
    this.passwordTextbox = getElement('password');
    this.serverTextbox = getElement('server');
    this.loginButton = getElement('login');

    this.validate = function() {
        expect(browser.getLocationAbsUrl()).toEqual('/login');
        expectNotNull(this.usernameTextbox);
        expectNotNull(this.passwordTextbox);
        expectNotNull(this.serverTextbox);
        expectNotNull(this.loginButton);
    };

    this.login = function(username, password, server) {
        this.usernameTextbox.sendKeys(username);
        this.passwordTextbox.sendKeys(password);
        this.serverTextbox.sendKeys(server);
        this.loginButton.click();

        return new DashboardPage();
    }
}

function NewLocationPage() {
    this.locationName = getElement('locationName');
    this.locationType = getElement('locationType');
    this.latitude = getElement('latitude');
    this.longitude = getElement('longitude');
    this.altitude = getElement('altitude');
    this.accuracy = getElement('accuracy');
    this.fieldWorker = getElement('fieldWorkerId');
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
                         latitude, longitude, altitude, accuracy,
                         fieldWorker) {
        this.locationName.sendKeys(locationName);
        element(by.cssContainingText('option', locationType)).click();
        this.latitude.sendKeys(latitude);
        this.longitude.sendKeys(longitude);
        this.altitude.sendKeys(altitude);
        this.accuracy.sendKeys(accuracy);
        this.fieldWorker.sendKeys(fieldWorker);
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


