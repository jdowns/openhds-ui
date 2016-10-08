var fw = require('./framework.js');

function FieldWorkerHomePage() {
    this.create_button = fw.getElement("create_location");
    this.update_button = fw.getElement("update_location");

    this.newCensus = function() {
        this.create_button.click();
    };

    this.updateVisit = this.update_button.click;
}

exports.FieldWorkerHomePage = FieldWorkerHomePage;
