'use strict';

var LoginPage = require('./pages/loginPage.js').LoginPage;
var BaselinePage = require('./pages/baselinePage.js').BaselinePage;
/*
var FieldWorkerHomePage = require('./fieldWorkerHomePage.js').FieldWorkerHomePage;
var CreateSocialGroupPage = require('./createSocialGroupPage.js').CreateSocialGroupPage;
var CreateLocationPage = require('./createLocationPage.js').CreateLocationPage;
var CreateIndividualsPage = require('./createIndividualPage.js').CreateIndividualsPage;
var CreateRelationshipPage = require('./createRelationshipPage.js').CreateRelationshipPage;
var CreateVisitPage = require('./createVisitPage.js').CreateVisitPage;
var IndividualUpdatePage = require('./individualUpdatePage.js').IndividualUpdatePage;
var PregnancyOutcomePage = require('./pregnancyOutcomePage.js').PregnancyOutcomePage;
var PregnancyResultPage = require('./pregnancyResultPage.js').PregnancyResultPage;
var PregnancyObservationPage = require('./pregnancyObservationPage.js').Page;
var DeathPage = require('./deathPage.js').Page;
*/

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

    it('Allows a data entry worker to create a new location', function() {
        login();
        expect(browser.getLocationAbsUrl()).toEqual('/baseline');

        var baselinePage = new BaselinePage();
        baselinePage.setCollectionDate('01-01-2000');
        baselinePage.setFieldWorker();

        browser.sleep(1000);

        var currentFieldworker = baselinePage.getCurrentFieldworker();

        expect(currentFieldworker).toEqual('fieldworker');

        baselinePage.setHierarchy();
        expect(baselinePage.getCurrentHierarchy()).toEqual('hierarchy-0-1-1');
        browser.sleep(1000);
        baselinePage.nextButton.click();
        browser.sleep(1000);

        baselinePage.newLocationButton.click();
        browser.sleep(1000);
        baselinePage.setLocationName('foo');
        baselinePage.setLocationExtId('foo');
        baselinePage.selectLocationType('urban');
        baselinePage.createLocationButton.click();
        expect(baselinePage.getCurrentLocation()).toMatch(/.*uuid.*/);

    });
});
