'use strict';

var LoginPage = require('./pages/loginPage.js').LoginPage;
var BaselinePage = require('./pages/baselinePage.js').BaselinePage;

var fw = require('./framework.js');
var getElement = fw.getElement;
var selectOption = fw.selectOption;

describe('OpenHDS workflows ', function() {

    beforeEach(function() {
        browser.get('/');
    });

    function login() {
        var loginPage = new LoginPage();
        loginPage.doLogin("user", "password");
    }

    function setGlobalBaseline() {
        var baselinePage = new BaselinePage();

        baselinePage.setCollectionDate('01-13-2016');
        baselinePage.setDefaultFieldWorker();
        baselinePage.setHierarchy();
        baselinePage.nextButton.click();
        browser.driver.wait(protractor.until.elementIsVisible(baselinePage.newLocationModalButton));
        return baselinePage;
    }

    it('Displays an error message if login is unsuccessful', function() {
        var loginPage = new LoginPage();
        loginPage.doLogin('bad', 'credentials');

        var usernameAfterLogin = loginPage.username.getAttribute('value');
        var passwordAfterLogin = loginPage.password.getAttribute('value');

        expect(usernameAfterLogin).toEqual('');
        expect(passwordAfterLogin).toEqual('');
    });

    it('Has only one active location', function() {
        login();
        var baselinePage = setGlobalBaseline();

        var locationModal = baselinePage.openLocationModal();
        locationModal.setName('a test location');
        locationModal.setExtId('locationId');
        locationModal.setType('urban');
        locationModal.submit();

        expect(fw.getElement('selectedLocationExtId')
               .getText()).toEqual('locationId');

        browser.sleep(1000);

        locationModal = baselinePage.openLocationModal();
        locationModal.setName('a test location');
        locationModal.setExtId('a different locationId');
        locationModal.setType('urban');
        locationModal.submit();

        expect(fw.getElement('selectedLocationExtId')
               .getText()).toEqual('a different locationId');
    });

    it('Displays all selected social groups', function() {
        login();
        var baselinePage = setGlobalBaseline();

        baselinePage.socialGroupTab.click();
        browser.sleep(2000);
        baselinePage.createSocialGroupButton.click();
        baselinePage.setGroupName('group name one');
        baselinePage.setGroupExtId('groupIdOne');
        baselinePage.selectGroupType('family');
        baselinePage.submitSocialGroupButton.click();
        browser.sleep(1000);
        baselinePage.createSocialGroupButton.click();
        baselinePage.setGroupName('group name two');
        baselinePage.setGroupExtId('groupIdTwo');
        baselinePage.selectGroupType('family');
	browser.sleep(1000);
        baselinePage.submitSocialGroupButton.click();

        browser.sleep(1000);
        expect(fw.getElement('groupIdOne').getText()).toEqual('groupIdOne');
        expect(fw.getElement('groupIdTwo').getText()).toEqual('groupIdTwo');
    });

    it('Creates a baseline census', function() {
        login();
        var baselinePage = setGlobalBaseline();

        // Fill out location
        baselinePage.newLocationModalButton.click();
        baselinePage.setLocationName('a test location');
        baselinePage.setLocationExtId('locationId');
        baselinePage.selectLocationType('urban');
        baselinePage.createLocationButton.click();
        browser.sleep(2000);
        baselinePage.goToSocialGroupButton.click();

        // Fill out social group
        browser.sleep(2000);
        baselinePage.createSocialGroupButton.click();
        baselinePage.setGroupName('group name one');
        baselinePage.setGroupExtId('groupIdOne');
        baselinePage.selectGroupType('family');
        baselinePage.submitSocialGroupButton.click();
        browser.sleep(2000);
        baselinePage.goToIndividualsButton.click();
        browser.sleep(2000);
	fw.getElement('openCreateIndividualsModal').click();
	browser.sleep(1000);

	// fill out individual one
        baselinePage.setIndividualFirstName('first name one');
        baselinePage.setIndividualLastName('last name one');
        baselinePage.setExternalId('id-1');
        baselinePage.setGender('male');
        baselinePage.setDob('01-01-1980');
        baselinePage.setResidencyStartDate('01-13-2016');
        baselinePage.startAssignMemberships();
	fw.selectOption('first name one');
	fw.selectOption('group name one');
	fw.getElement('membershipStartType_select').element(by.cssContainingText("option", "head")).click();
	fw.getElement('membershipStartDate_input').sendKeys('01-13-2016');
	fw.getElement('createMembership').click();
	browser.sleep(1000);

       //fill out individual two

	fw.getElement('openCreateIndividualsModal').click();
	browser.sleep(1000);
        baselinePage.setIndividualFirstName('first name two');
        baselinePage.setIndividualLastName('last name two');
        baselinePage.setExternalId('id-2');
        baselinePage.setGender('male');
        baselinePage.setDob('01-01-1980');
        baselinePage.setResidencyStartDate('01-13-2016');
        baselinePage.startAssignMemberships();
	fw.selectOption('first name two');
	fw.selectOption('group name one');
	fw.getElement('membershipStartType_select').element(by.cssContainingText("option", "spouseOfHead")).click();
	fw.getElement('membershipStartDate_input').sendKeys('01-13-2016');
	fw.getElement('createMembership').click();
	browser.sleep(1000);

	fw.getElement('startRelationships').click();
	browser.sleep(2000);

	fw.getElement('createRelationship').click();
	browser.sleep(1000);


	fw.getElement('individualA_select').element(by.cssContainingText("option", "id-1")).click();
	fw.getElement('individualB_select').element(by.cssContainingText("option", "id-2")).click();
	fw.getElement('startType_select').element(by.cssContainingText("option", "spouse")).click();
	fw.getElement('startDate_input').sendKeys('01-13-2016');

	fw.getElement('submitRelationship').click();

	browser.sleep(1000);

	fw.getElement('completeBaseline').click();

    });

});
