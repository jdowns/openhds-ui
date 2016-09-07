var fw = require('./framework.js');

function CreateVisitPage() {
    this.externalId = fw.getElement('extId_input');
    this.visitDate = fw.getElement('visitDate_input');
    this.hasInMigrations = fw.getElement('hasInMigrations');
    this.submit = fw.getElement("createButton");

    this.doCreateVisit = function(visit) {
        this.externalId.sendKeys(visit.extId);
        fw.selectOption(visit.location);
        this.visitDate.sendKeys(visit.visitDate);
        if(visit.toggleHasInMigrations) {
            this.hasInMigrations.click();
        }
        this.submit.click();
    };

}

exports.CreateVisitPage = CreateVisitPage;
