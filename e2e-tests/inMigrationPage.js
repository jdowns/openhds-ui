var fw = require('./framework.js');

function InMigrationPage() {
    this.origin = fw.getElement('origin_input');
    this.migrationDate = fw.getElement('migrationDate_input');
    this.firstName = fw.getElement('firstName_input');
    this.extId = fw.getElement('extId_input');
    this.gender = fw.getElement('gender_input');
    this.destination = fw.getElement('destination_input');
    this.submit = fw.getElement("createButton");

    this.doCreate = function(update) {
        this.reason.sendKeys(update.reason);
        this.destination.sendKeys(update.destination);
        fw.selectOption(update.migrationType);
        this.migrationDate.sendKeys(update.migrationDate);
        this.submit.click();
    };
}

exports.InMigrationPage = InMigrationPage;
