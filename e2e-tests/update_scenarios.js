'use strict';

var LoginPage = require('./pages/loginPage.js').LoginPage;
var NewVisitPage = require('./pages/newVisitPage.js').NewVisitPage;
var AddEventsPage = require('./pages/addEventsPage.js').AddEventsPage;
var fw = require('./framework.js');
var request = require('request');
/* new visit page:
     - visitDate
     - externalId
     - fieldWorkerModal
     - locationHierarchyModal
     - locationModal
     - submit
 */

/* add events page
   - in migration modal
   - out migration modal
   - pregnancy observation
   - pregnancy outcome
   - death
   - submit
 */

function successfulLogin() {
    var username = "user";
    var password = "password";

    var loginPage = new LoginPage();
    loginPage.doLogin(username, password);
    browser.sleep(1000);
}

describe('OpenHDS Update Workflows', function() {
    beforeEach(function() {
        browser.get('/');
    });

    it('cannot start update until new visit form is completed', function() {
        successfulLogin();

        var newVisitPage = new NewVisitPage();
        newVisitPage.go();

        var visitData = {
            extId: "e2e-test-visit",
            visitDate: "2016-01-01",
            fieldWorkerId: "fieldworker",
            hierarchy: ["hierarchy-0", "hierarchy-0-1", "hierarchy-0-1-1"]
        };

        newVisitPage.enterVisit(visitData);

        expect(fw.isEnabled('begin_visit_button')).toEqual(false);
    });

    it('creates new visit when begin visit is clicked', function() {
        successfulLogin();

        var newVisitPage = new NewVisitPage();
        newVisitPage.go();

        var visitData = {
            extId: "e2e-test-visit",
            visitDate: "01-01-2016",
            fieldWorkerId: "fieldworker",
            hierarchy: ["hierarchy-0", "hierarchy-0-1", "hierarchy-0-1-1"],
            locationId: "location-0"
        };

        newVisitPage.enterVisit(visitData);

        expect(fw.isEnabled('begin_visit_button')).toEqual(true);
       // check backend for new visit with uuid
    });

    it('visit can be completed with no events', function() {
        successfulLogin();

        var newVisitPage = new NewVisitPage();
        newVisitPage.go();

        var visitData = {
            extId: "e2e-test-visit",
            visitDate: "01-01-2016",
            fieldWorkerId: "fieldworker",
            hierarchy: ["hierarchy-0", "hierarchy-0-1", "hierarchy-0-1-1"],
            locationId: "location-0"
        };

        newVisitPage.enterVisit(visitData);
        newVisitPage.submit();

        fw.pauseForBootstrap();
        var addEventsPage = new AddEventsPage();
        addEventsPage.completeVisit();

    });

    it('selects individual for update', function() {
        successfulLogin();

        var newVisitPage = new NewVisitPage();
        newVisitPage.go();

        var visitData = {
            extId: "e2e-test-visit",
            visitDate: "01-01-2016",
            fieldWorkerId: "fieldworker",
            hierarchy: ["hierarchy-0", "hierarchy-0-1", "hierarchy-0-1-1"],
            locationId: "location-0"
        };

        newVisitPage.enterVisit(visitData);
        newVisitPage.submit();

        var addEventsPage = new AddEventsPage();
        addEventsPage.openIndividualSelectModal();
        addEventsPage.selectIndividual('location-7-head');

        expect(fw.getElement('currentIndividual').getAttribute('value'))
            .toEqual('location-7-head');
    });

    it('creates in migration', function() {
        successfulLogin();

        var newVisitPage = new NewVisitPage();
        newVisitPage.go();

        var visitData = {
            extId: "e2e-test-visit",
            visitDate: "01-01-2016",
            fieldWorkerId: "fieldworker",
            hierarchy: ["hierarchy-0", "hierarchy-0-1", "hierarchy-0-1-1"],
            locationId: "location-0"
        };

        newVisitPage.enterVisit(visitData);
        newVisitPage.submit();

        var addEventsPage = new AddEventsPage();
        addEventsPage.openIndividualSelectModal();
        addEventsPage.selectIndividual('location-7-head');

        var inMigration = {
            origin: "a place",
            reason: "moved",
            type: 'internal'
        };
        addEventsPage.submitInMigration(inMigration);

    });

});
