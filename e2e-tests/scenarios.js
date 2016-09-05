'use strict';

var LoginPage = require('./loginPage.js').LoginPage;
var FieldWorkerHomePage =
        require('./fieldWorkerHomePage.js').FieldWorkerHomePage;
var CreateSocialGroupPage =
        require('./createSocialGroupPage.js').CreateSocialGroupPage;
var CreateLocationPage =
        require('./createLocationPage.js').CreateLocationPage;
var CreateIndividualsPage =
        require('./createIndividualPage.js').CreateIndividualsPage;
var CreateRelationshipPage =
        require('./createRelationshipPage.js').CreateRelationshipPage;

var fw = require('./framework.js');
var getElement = fw.getElement;
var selectOption = fw.selectOption;

describe('OpenHDS workflows ', function() {

    beforeEach(function() {
        browser.get('/app/index.html');
    });

    it('Allows a fieldworker to create a baseline census', function() {
        var loginPage = new LoginPage();
        loginPage.setUsername("fieldworker");
        loginPage.setPassword("password");
        loginPage.login();
        browser.driver.sleep(5000);
        expect(browser.getLocationAbsUrl()).toEqual('/fieldworkerHome');

        var homePage = new FieldWorkerHomePage();
        homePage.newCensus();
        browser.driver.sleep(2000);
        expect(browser.getLocationAbsUrl()).toEqual('/location/new');

        browser.driver.sleep(2000);
        var locationPage = new CreateLocationPage();
        locationPage.setLocationName("Test Location");
        locationPage.setExternalId("Test Location");
        locationPage.setLocationType("rural");
        selectOption('hierarchy-root');
        selectOption('hierarchy-0');
        selectOption('hierarchy-0-1');
        selectOption('hierarchy-0-1-1');
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
        relationshipPage.selectRelationshipType('spouse');
        relationshipPage.setStartDate('2000-01-01');
        relationshipPage.createRelationship();
        browser.driver.sleep(2000);
        expect(browser.getLocationAbsUrl()).toEqual('/fieldworkerHome');
    });

    it('allows a fieldworker to update a location', function() {

    });
});
