<<<<<<< HEAD
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
=======
/* global describe, it, expect, beforeEach, afterEach, module, inject, browser, element, by */
'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

    it('should fire View2Ctrl when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p:nth-child(2)')).first().getText()).
        toMatch(/hey this is ctrl2/);
    });
  });
});
>>>>>>> 8b3707fe7bc53619552944e6733312d33f49eb6c
