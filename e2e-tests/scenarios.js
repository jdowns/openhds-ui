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
        browser.sleep(2000);
        return baselinePage;
    }

    it('Creates a baseline census', function() {
        login();
        var baselinePage = setGlobalBaseline();

        // Fill out location
        fw.click('displayNewLocationModal');
        browser.sleep(2000);
        fw.sendKeys('locationName_input', 'a test location');
        fw.sendKeys('locationExtId_input', 'locationId');
        fw.selectOption('urban');
        fw.click('createLocation');
        browser.sleep(2000);
        fw.click('startSocialGroups');

        // Fill out social group
        browser.sleep(2000);
        fw.click('createSocialGroup');
        browser.sleep(2000);
        fw.sendKeys('groupName_input', 'group name one');
        fw.sendKeys('socialGroupExtId_input', 'groupIdOne');
        fw.selectOption('family');
        fw.click('submitSocialGroup');
        browser.sleep(2000);
        fw.click('startIndividuals');
        browser.sleep(2000);

        fw.click('openCreateIndividualsModal');
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
        fw.click('createMembership');
        browser.sleep(1000);

        //fill out individual two

        console.log('CREATING INDIVIDUAL TWO')

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

        fw.click('startRelationships');
        browser.sleep(2000);

        fw.click('createRelationship');
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
