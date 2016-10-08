var fw = require('./framework.js');

exports.Page = function() {
    var place = fw.getElement('deathPlace_input');
    var cause = fw.getElement('deathCause_input');
    var date = fw.getElement('deathDate_input');
    var submit = fw.getElement("createButton");

    this.doCreate = function(update) {
        place.sendKeys(update.place);
        cause.sendKeys(update.cause);
        date.sendKeys(update.date);

        submit.click();
    };
};
