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
    });

});

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
        expect(this.usernameTextbox).not.toBeNull();
        expect(this.passwordTextbox).not.toBeNull();
        expect(this.serverTextbox).not.toBeNull();
        expect(this.loginButton).not.toBeNull();
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
        expect(this.locationName).not.toBeNull();
        expect(this.locationType).not.toBeNull();
        expect(this.latitude).not.toBeNull();
        expect(this.longitude).not.toBeNull();
        expect(this.altitude).not.toBeNull();
        expect(this.accuracy).not.toBeNull();
        expect(this.fieldWorker).not.toBeNull();
        expect(this.createButton).not.toBeNull();
        expect(this.cancelButton).not.toBeNull();
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
    this.validate = function() {
        expect(browser.getLocationAbsUrl()).toEqual('/individual/new');
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


