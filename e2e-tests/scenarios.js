/* Ignoring these tests because of basic auth :/ */

//'use strict';
//
//describe('OpenHDS workflows ', function() {
//
//    beforeEach(function() {
//        browser.get('/app');
//    });
//
//    it('Allows a user to login as a fieldworker', function() {
//        var beginCensusPage = validBeginCensusPage();
//        beginCensusPage.setFieldWorkerId("fieldworker");
//        beginCensusPage.setPassword("password");
//        beginCensusPage.setBackend("http://localhost:8080");
//        beginCensusPage.login();
//        expect(browser.getLocationAbsUrl()).toEqual('/individual/new');
//    });
//
//    it('Displays an error message for invalid credentials', function() {
//        var beginCensusPage = validBeginCensusPage();
//        beginCensusPage.setFieldWorkerId('not-a-real-fieldworker');
//        beginCensusPage.setPassword('not a real password');
//        beginCensusPage.setBackend("http://localhost:8080");
//        beginCensusPage.login();
//        expect(beginCensusPage.hasErrors()).toBe(true);
//    });
//
//    it('Allows a user to create a new location with an individual', function () {
//        var dashboardPage = new DashboardPage();
//        dashboardPage.validate();
//        dashboardPage.setFieldWorkerId('field-worker');
//        expect(dashboardPage.fieldWorker.getAttribute('value')).toBe('field-worker');
//
//        var newLocationPage = dashboardPage.createNewLocation();
//
//        newLocationPage.validate();
//        newLocationPage.fill('UnitTestLand', 'Urban', '0.0', '0.0', '0.0', '0.0');
//        var individualPage = newLocationPage.submit();
//
//
//        individualPage.validate();
//        individualPage.fill("john", "a.", "smith", "9/1/1980", "suzie a. smith", "john b. smith");
//        expect(individualPage.fieldWorkerId.getAttribute('value')).toBe("field-worker");
//        dashboardPage = individualPage.submit();
//
//        dashboardPage.validate();
//    });
//
//});
//
//function BeginCensusPage() {
//    this.fieldWorkerId = getElement("fieldWorkerId");
//    this.password = getElement("password");
//    this.backend = getElement("backend");
//    this.loginButton = getElement("new-location");
//
//    this.validate = function() {
//        return this;
//    };
//
//    this.hasErrors = function() {
//        return getElement("errors").isDisplayed();
//    };
//
//    this.setFieldWorkerId = function(fwid) {
//        this.fieldWorkerId.sendKeys(fwid);
//    };
//    this.setPassword = function(password) {
//        this.password.sendKeys(password);
//    };
//    this.login = function() {
//        this.loginButton.click();
//        return new NewLocationPage();
//    };
//
//    this.setBackend = function(backend) {
//        this.backend.sendKeys(backend);
//    };
//}
//
//function validBeginCensusPage() {
//    return new BeginCensusPage().validate();
//}
//
//function expectNotNull(element) {
//    expect(element).not.toBeNull();
//}
//
//function getElement(id) {
//    return element(by.id(id));
//}
//
//function NewLocationPage() {
//    this.locationName = getElement('locationName');
//    this.locationType = getElement('locationType');
//    this.latitude = getElement('latitude');
//    this.longitude = getElement('longitude');
//    this.altitude = getElement('altitude');
//    this.accuracy = getElement('accuracy');
//    this.fieldWorker = getElement('fieldWorkerId');
//    this.createButton = getElement('createButton');
//    this.cancelButton = getElement('cancelButton');
//
//    this.validate = function() {
//        expect(browser.getLocationAbsUrl()).toEqual('/location/new')
//        expectNotNull(this.locationName);
//        expectNotNull(this.locationType);
//        expectNotNull(this.latitude);
//        expectNotNull(this.longitude);
//        expectNotNull(this.altitude);
//        expectNotNull(this.accuracy);
//        expectNotNull(this.fieldWorker);
//        expectNotNull(this.createButton);
//        expectNotNull(this.cancelButton);
//    };
//
//    this.fill = function(locationName, locationType,
//                         latitude, longitude, altitude, accuracy) {
//        this.locationName.sendKeys(locationName);
//        element(by.cssContainingText('option', locationType)).click();
//        this.latitude.sendKeys(latitude);
//        this.longitude.sendKeys(longitude);
//        this.altitude.sendKeys(altitude);
//        this.accuracy.sendKeys(accuracy);
//    };
//
//    this.submit = function() {
//        this.createButton.click();
//        return new NewIndividualPage();
//    }
//}
//
//function NewIndividualPage() {
//    this.firstName = getElement('firstName');
//    this.middleName = getElement('middleName');
//    this.lastName = getElement('lastName');
//    this.dateOfBirth = getElement('dateOfBirth');
//    this.mother = getElement('mother');
//    this.father = getElement('father');
//    this.relationships = getElement('relationships');
//    this.fieldWorkerId = getElement('fieldWorkerId');
//    this.submitForm = getElement('submit');
//
//    this.validate = function() {
//        expect(browser.getLocationAbsUrl()).toEqual('/individual/new');
//        expectNotNull(this.firstName);
//        expectNotNull(this.middleName);
//        expectNotNull(this.lastName);
//        expectNotNull(this.dateOfBirth);
//        expectNotNull(this.mother);
//        expectNotNull(this.father);
//        expectNotNull(this.relationships);
//        expectNotNull(this.fieldWorkerId);
//    };
//
//    this.fill = function(firstName, middleName, lastName, dateOfBirth, mother, father, relationships) {
//        this.firstName = firstName;
//        this.middleName = middleName;
//        this.lastName = lastName;
//        this.dateOfBirth = dateOfBirth;
//        this.mother = mother;
//        this.father = father;
//        this.relationships = relationships;
//    };
//
//    this.submit = function() {
//        this.submitForm.click();
//        return new DashboardPage();
//    }
//}
//
//function DashboardPage() {
//    this.fieldWorker = getElement('fieldWorkerId');
//    this.newLocationButton = getElement('new-location');
//
//    this.validate = function() {
//        expect(browser.getLocationAbsUrl()).toEqual('/home');
//        expect(this.newLocationButton).toBeDefined();
//    };
//
//    this.createNewLocation = function() {
//        this.newLocationButton.click();
//        return new NewLocationPage();
//    };
//
//    this.setFieldWorkerId = function(fieldWorkerName) {
//        this.fieldWorker.clear();
//        this.fieldWorker.sendKeys(fieldWorkerName);
//    }
//}
//
//
