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
        expect(this.usernameTextbox).toBeDefined();
        expect(this.passwordTextbox).toBeDefined();
        expect(this.serverTextbox).toBeDefined();
        expect(this.loginButton).toBeDefined();
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
    this.createButton = getElement('create');
    this.cancelButton = getElement('cancel');

    this.validate = function() {
        expect(browser.getLocationAbsUrl()).toEqual('/location/new')
        expect(this.locationName).toBeDefined();
        expect(this.locationType).toBeDefined();
        expect(this.latitude).toBeDefined();
        expect(this.longitude).toBeDefined();
        expect(this.altitude).toBeDefined();
        expect(this.accuracy).toBeDefined();
        expect(this.fieldWorker).toBeDefined();
        expect(this.createButton).toBeDefined();
        expect(this.cancelButton).toBeDefined();
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


