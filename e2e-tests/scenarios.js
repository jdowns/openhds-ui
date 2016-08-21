'use strict';

function getElement(id) {
    return element(by.id(id));
}

function selectOption(optionName) {
    element(by.cssContainingText('option', optionName)).click();
}

function LoginPage() {
    this.username = getElement("username_input");
    this.password = getElement("password_input");
    this.submit = getElement("createButton");

    this.validate = function() {
        return this;
    };

    this.setUsername = function(username) {
        this.username.sendKeys(username);
    };
    this.setPassword = function(password) {
        this.password.sendKeys(password);
    };
    this.login = this.submit.click;
}

function FieldWorkerHomePage() {
    this.create_button = getElement("create_location");
    this.update_button = getElement("update_location");

    this.newCensus = function() {
        this.create_button.click();
    };

    this.updateVisit = this.update_button.click;
}

function CreateLocationPage() {
    this.locationName = getElement("locationName_input");
    this.externalId = getElement("extId_input");
    this.locationType = getElement("locationType_select");
    this.submit = getElement("createButton");

    this.setLocationName = function(name) {
        this.locationName.sendKeys(name);
    };
    this.setExternalId = function(extId) {
        this.externalId.sendKeys(extId);
    };
    this.setLocationType = selectOption;

    this.createLocation = this.submit.click;
}

function CreateSocialGroupPage() {
    this.groupName = getElement("groupName_input");
    this.externalId = getElement("extId_input");
    this.groupType = getElement("groupType_select");
    this.submit = getElement("createButton");

    this.setGroupName = function(name) {
        this.groupName.sendKeys(name);
    };
    this.setExternalId = function(extId) {
        this.externalId.sendKeys(extId);
    };
    this.setGroupType = selectOption;

    this.createGroup = this.submit.click;
}

function CreateIndividualsPage() {
    this.firstName = getElement("firstName_input");
    this.externalId = getElement("extId_input");
    this.gender = getElement("gender_select");
    this.membbershipStartType = getElement("membershipStartType_select");
    this.membershipStartDate = getElement("membershipStartDate_input");
    this.residencyStartType = getElement("residencyStartType_select");
    this.residencyStartDate = getElement("residencyStartDate_input");
    this.submit = getElement("createButton");
    this.more = getElement("moreIndividuals_check");

    this.setFirstName = function(name) {
        this.firstName.clear();
        this.firstName.sendKeys(name);
    };
    this.setExternalId = function(extId) {
        this.externalId.clear();
        this.externalId.sendKeys(extId);
    };
    this.setGender = selectOption; // TODO: make this particular to the one select...
    this.setMembershipStartType = selectOption;
    this.setResidencyStartType = selectOption;
    this.setMembershipStartDate = function(date) {
        this.membershipStartDate.clear();
        this.membershipStartDate.sendKeys(date);
    };
    this.setResidencyStartDate = function(date) {
        this.residencyStartDate.clear();
        this.residencyStartDate.sendKeys(date);
    };
    this.clickMoreIndividuals = function() {
        this.more.click();
    };
    this.createIndividual = this.submit.click;
}

function CreateRelationshipPage() {
    this.individualB = getElement("individualB_input");
    this.relationshipType = getElement("relationshipType_select");
    this.startDate = getElement("startDate_input");
    this.submit = getElement("createButton");

    this.setIndividualB = function(individualId) {
        //TODO: this should be a select
        this.individualB.clear();
        this.individualB.sendKeys(individualId);
    };

    this.selectRelationshipType = selectOption;
    this.setStartDate = function(date) {
        this.startDate.clear();
        this.startDate.sendKeys(date);
    };
    this.createRelationship = this.submit.click;
}

describe('OpenHDS workflows ', function() {

    beforeEach(function() {
        browser.get('/app/index.html');
    });

    it('Allows a fieldworker to create a baseline census', function() {
        var loginPage = new LoginPage();
        loginPage.setUsername("fieldworker");
        loginPage.setPassword("password");
        loginPage.login();
        browser.driver.sleep(2000);
        expect(browser.getLocationAbsUrl()).toEqual('/fieldworkerHome');

        var homePage = new FieldWorkerHomePage();
        homePage.newCensus();
        browser.driver.sleep(2000);
        expect(browser.getLocationAbsUrl()).toEqual('/location/new');

        var locationPage = new CreateLocationPage();
        locationPage.setLocationName("Test Location");
        locationPage.setExternalId("Test Location");
        locationPage.setLocationType("rural");
        locationPage.createLocation();
        expect(browser.getLocationAbsUrl()).toEqual('/socialGroup/new');

        var socialGroupPage = new CreateSocialGroupPage();
        socialGroupPage.setGroupName("Test Group");
        socialGroupPage.setExternalId("Test Group");
        socialGroupPage.setGroupType("cohort");
        socialGroupPage.createGroup();
        expect(browser.getLocationAbsUrl()).toEqual('/individual/new');

        var individualPage = new CreateIndividualsPage();
        individualPage.setFirstName("Head of Household");
        individualPage.setExternalId("Head of Household");
        individualPage.setGender("female");
        individualPage.setMembershipStartType("head");
        individualPage.setMembershipStartDate("1980-01-01");
        individualPage.setResidencyStartType("birthMigration");
        individualPage.setResidencyStartDate("1980-01-01");
        individualPage.clickMoreIndividuals();
        individualPage.createIndividual();
        browser.driver.sleep(5000);
        expect(browser.getLocationAbsUrl()).toEqual('/individual/new');

        individualPage = new CreateIndividualsPage();
        individualPage.setFirstName("Spouse of Head");
        individualPage.setExternalId("Spouse of Head");
        individualPage.setGender("male");
        individualPage.setMembershipStartType("spouseOfHead");
        individualPage.setMembershipStartDate("2000-01-01");
        individualPage.setResidencyStartType("internalMigration");
        individualPage.setResidencyStartDate("2000-01-01");
        individualPage.clickMoreIndividuals();
        individualPage.createIndividual();
        browser.driver.sleep(5000);
        expect(browser.getLocationAbsUrl()).toEqual('/relationship/new');

        var relationshipPage = new CreateRelationshipPage();
        relationshipPage.setIndividualB('some_uuid');
        relationshipPage.setRelationshipType('spouse');
        relationshipPage.setStartDate('2000-01-01');
        relationshipPage.createRelationship();
        browser.driver.sleep(2000);
        expect(browser.getLocationAbsUrl()).toEqual('fieldworkerHome');
    });
});
