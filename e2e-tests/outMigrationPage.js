var fw = require('./framework.js');

function OutMigrationPage() {
    this.reason = fw.getElement('reason_input');
    this.destination = fw.getElement('destination_input');
    this.migrationType = fw.getElement('migrationType_input');
    this.migrationDate = fw.getElement('migrationDate_input');
    this.submit = fw.getElement("createButton");

    this.doCreate = function(update) {
        this.reason.sendKeys(update.reason);
        this.destination.sendKeys(update.destination);
        fw.selectOption(update.migrationType);
        this.migrationDate.sendKeys(update.migrationDate);
        this.submit.click();
    };
}

exports.OutMigrationPage = OutMigrationPage;
