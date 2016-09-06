var fw = require('./framework.js');

function DeathPage() {
    this.place = fw.getElement('deathPlace_input');
    this.cause = fw.getElement('deathCause_input');
    this.date = fw.getElement('deathDate_input');

    this.doCreate = function(update) {
        this.place.sendKeys(update.place);
        this.cause.sendKeys(update.cause);
        this.date.sendKeys(update.date);

        this.submit.click();
    };
}

exports.DeathPage = DeathPage;
