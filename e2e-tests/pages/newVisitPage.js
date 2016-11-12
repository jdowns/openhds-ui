var fw = require('../framework.js');

function NewVisitPage() {
    this.go = function() {
        var link = fw.getElement('update_link');
        link.click();

        fw.waitForElementVisible('visitDate_input');
    };

    this.enterVisit = function(data) {
        if (data.extId) {
            fw.getElement('extId_input')
                .sendKeys(data.extId);
        }
        if(data.visitDate) {
            fw.getElement('visitDate_input')
                .sendKeys(data.visitDate);
        }
        if(data.fieldWorkerId) {
            fw.pauseForBootstrap();
            openFieldWorkerSelectModal();
            fw.click(data.fieldWorkerId);
            fw.waitForElementInvisible('fieldworkerModal');
        }
        if(data.hierarchy) {
            fw.pauseForBootstrap();
            openHierarchySelectModal();
            data.hierarchy.forEach(function(h) {
                fw.selectOption(h);
                browser.sleep(500);
                fw.waitForElementInvisible('hierarchyModal');
            });
            fw.click('saveHierarchy');
        }
        if(data.locationId) {
            fw.pauseForBootstrap();
            openLocationModal();
            fw.pauseForBootstrap();
            fw.click(data.locationId);
            fw.waitForElementInvisible('locationSelectModal');
        }
        browser.sleep(1000);
    };

    this.submit = function() {
        fw.pauseForBootstrap();
        fw.getElement('begin_visit_button').click();
        waitForPageLoad();
    };


    function waitForPageLoad() {
        browser.sleep(2000);
    }

    function openFieldWorkerSelectModal() {
        fw.click('fieldworker-select');
        fw.waitForElementVisible('fieldworkerModal');
    }

    function openHierarchySelectModal() {
        fw.click('hierarchy-select');
        fw.waitForElementVisible('hierarchyModal');
    }

    function openLocationModal() {
        fw.click('location-select');
        fw.waitForElementVisible('locationSelectModal');
    }
}

exports.NewVisitPage = NewVisitPage;
