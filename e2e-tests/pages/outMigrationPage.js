var fw = require('./framework.js');

exports.Page = function() {
    var reason = fw.getElement('reason_input');
    var destination = fw.getElement('destination_input');
    var migrationType = fw.getElement('migrationType_input');
    var migrationDate = fw.getElement('migrationDate_input');
    var submit = fw.getElement("createButton");

    this.doCreate = function(update) {
        reason.sendKeys(update.reason);
        destination.sendKeys(update.destination);
        migrationType.sendKeys(update.migrationType);
        migrationDate.sendKeys(update.migrationDate);
        submit.click();
    };
};
